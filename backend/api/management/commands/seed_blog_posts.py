from django.core.management.base import BaseCommand
from api.models import BlogPost

REDIS_CONTENT = r'''# Redis Demystified: A Deep Dive From Two Decades in the Trenches

I've built systems on relational databases when "NoSQL" wasn't even a word yet, watched memcached rule the caching world, and then watched Redis quietly eat its lunch by doing everything memcached did and about ten things it couldn't dream of. This is the blog I wish someone had handed me the day I first typed `redis-cli` into a terminal. No fluff, no copy-pasted docs — just the mental model that took me years to build, compressed into one read.

Let's go top to bottom: why Redis exists, how it's built (HLD), what's happening under the hood (LLD), and then the four topics everyone asks about in interviews and in production incidents — persistence, pub/sub, OTP-style use cases, and eviction vs TTL.

## 1. Why Redis Exists (The 30,000 ft View)

Every system eventually hits the same wall: your database is durable but slow, and your application needs something durable-ISH but blazing fast. Redis fills that gap. It is, at its heart, an **in-memory data structure server**. Not just a cache — a server that happens to speak strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, geospatial indexes, and streams, all backed by RAM.

The reason it became the default choice for caching, session storage, rate limiting, leaderboards, distributed locks, and pub/sub isn't luck. It's because Redis picked one core trade-off early and never wavered: **sacrifice some durability guarantees to get near-microsecond latency, then let the developer choose how much durability to buy back.**

Keep that sentence in your head. Almost every design decision in Redis traces back to it.

## 2. High Level Design (HLD) — How Redis Sits in Your Architecture

Picture a typical web request in a mid-size system:

```
Client -> Load Balancer -> App Server -> Redis (cache check)
                                 |
                                 v (cache miss)
                             Primary DB (Postgres/MySQL/Mongo)
```

At a high level, Redis sits as a separate process (or cluster of processes) that your application talks to over TCP using a simple text-based protocol called **RESP** (REdis Serialization Protocol). It is NOT embedded in your app — it's a standalone server, which means:

- It can be scaled independently of your application tier.
- It can be shared across multiple services (careful with this — more on "shared Redis" anti-patterns later).
- It can fail independently, so your app needs a fallback path (usually: fall through to the primary DB on cache miss or Redis unavailability).

For high availability, real deployments never run a single Redis node. You'll see one of two topologies:

### a) Redis Sentinel
A small quorum of Sentinel processes monitors a primary and its replicas, and promotes a replica to primary on failure. Good for simpler HA without sharding.

### b) Redis Cluster
Data is split into **16,384 hash slots**, distributed across multiple primary nodes (each with its own replicas). This gives you horizontal scaling AND high availability. Your client library needs to be cluster-aware to route keys to the right slot.

At HLD level, that's 90% of what you need to reason about: a fast, in-memory layer, sitting beside your source of truth, replicated for availability, sharded for scale.

## 3. Low Level Design (LLD) — What's Actually Happening Inside

This is where most tutorials stop and most engineers get burned in production. Let's not stop here.

### 3.1 Data structures under the hood

Every Redis "value" you see (string, hash, list, etc.) is a facade over a carefully chosen internal encoding, picked to save memory for small collections and switched automatically as the collection grows:

- **Strings** are stored as **SDS** (Simple Dynamic Strings) — not C strings. SDS stores length explicitly, so length checks are O(1) and it avoids buffer overflow issues that plague raw C strings. It also over-allocates memory to make appends cheap.
- **Small hashes and small lists** use **"listpack"** (successor to "ziplist") — a compact, contiguous memory blob, cache-friendly, avoiding pointer overhead. Once the collection crosses a size threshold (`hash-max-listpack-entries`, etc.), Redis converts it to a proper hash table or linked structure.
- **Sets of small integers** use **"intset"** — a sorted array of integers.
- **Sorted sets (ZSET)** use a **skip list plus a hash table** combo — the hash table gives O(1) score lookup by member, the skip list gives O(log N) range queries and ordered traversal. This dual structure is a beautiful example of trading memory for the ability to answer two very different query shapes efficiently.
- The main keyspace itself is a **hash table (dict)**, with **incremental rehashing** — when it needs to grow, Redis doesn't stop the world to rehash everything at once; it does it a few buckets at a time on each subsequent command, so you never see a giant latency spike from a single rehash operation.

### 3.2 The single-threaded event loop

This is the single most misunderstood design decision in Redis, so let's really unpack it.

Redis's core command execution is **single-threaded**. One thread, one command at a time, running an event loop built on top of a multiplexing syscall (`epoll` on Linux, `kqueue` on BSD/macOS). The loop looks conceptually like:

```
while (true) {
    events = epoll_wait(socket_fds)   // wait for readable sockets
    for each event:
        read command from socket
        execute command against in-memory data
        write response back to socket
}
```

**Why single-threaded, and why it's not the handicap it sounds like:**

- **No locks needed.** Since only one thread ever touches the data structures, there's no mutex/semaphore overhead, no risk of deadlocks, and every command is naturally atomic.
- **No context switching cost.** Redis sidesteps OS scheduler arbitration between worker threads for data access — one thread runs to completion on each command, uninterrupted, so the CPU pipeline and cache stay hot.
- **Predictable latency.** Commands run to completion without being preempted mid-execution by another command touching the same data.

**The catch:** if a single command is slow — think `KEYS *` on a huge keyspace, or `SMEMBERS` on a giant set, or an unbounded Lua script — that ONE command blocks the entire event loop. Mitigations:

- Never run `KEYS` in production — use `SCAN`.
- Avoid unbounded collections — cap list/set/hash sizes at the application level.
- Since Redis 6.0, network I/O can use I/O threads, but **command execution is STILL single-threaded**.
- Prefer `UNLINK` over `DEL` for large keys.

## 4. Persistence — Making an In-Memory Store Survive a Restart

Remember the founding trade-off: speed first, durability configurable. Redis gives you two independent mechanisms.

### 4.1 RDB (Redis Database snapshot)

A point-in-time binary snapshot. Use `BGSAVE` (never `SAVE` in production). Pros: compact, fast restarts. Cons: lose writes since last snapshot on crash.

### 4.2 AOF (Append Only File)

Every write is appended to a log. fsync policies: `always`, `everysec` (sane default), or `no`. Periodic AOF rewrite compactes the log via fork + COW.

### 4.3 Hybrid approach

RDB-preamble AOF + `appendfsync everysec` is the default I reach for — unless the workload is pure cache, in which case persistence can be off.

## 5. Pub/Sub — How It Works and Where It Breaks

Pub/Sub fans out messages in-memory to currently subscribed clients. **No queue, no persistence, no replay.** Perfect for cache invalidation and ephemeral notifications. Wrong tool for guaranteed delivery — use **Redis Streams** instead.

## 6. OTP Systems on Redis

Best-fit use case: fast reads/writes, native TTL, atomic counters.

```
SET otp:{user_id} 482913 EX 300 NX
INCR otp:attempts:{user_id}
EXPIRE otp:attempts:{user_id} 3600
GET otp:{user_id}
DEL otp:{user_id}
```

## 7. TTL vs Eviction

**TTL** is a key saying "delete me at this time, no matter what" (lazy + active expiration).  
**Eviction** is Redis saying "I'm out of room, who can I sacrifice?" via `maxmemory-policy` (e.g. `allkeys-lru`). Do not leave the default `noeviction` on a cache.

## 8. Integrating Redis

1. Pick a client library (RESP + pooling).
2. Choose topology: single, Sentinel, or Cluster.
3. Choose access pattern: cache-aside (most common) or write-through.

```
value = redis.GET("user:123")
if value is null:
    value = db.query("SELECT * FROM users WHERE id=123")
    redis.SET("user:123", serialize(value), EX=300)
return value
```

## 9. Hard-Earned Production Lessons

- Set `maxmemory` and a sane eviction policy on day one.
- Never run O(N) commands against production — use `SCAN`.
- Watch hot keys and big keys; prefer `UNLINK` for large deletes.
- Don't treat Redis as the only copy of anything you can't afford to lose.

## Closing Thought

Redis's genius is one clear trade-off — **speed over durability, by default** — and a disciplined set of decisions around it. Once that mental model clicks, every feature stops looking like a grab-bag and starts looking inevitable.
'''

KAFKA_CONTENT = r'''# Kafka Demystified: A Deep Dive From Two Decades in the Trenches

If Redis taught the industry how fast in-memory access could be, Kafka taught it how to move enormous volumes of events reliably, in order, and without losing anyone's place. Kafka is a **distributed, append-only commit log** — not a queue. That single mental shift changes how you design everything on top of it.

## Why Kafka Exists

Traditional queues use consume-and-remove. Kafka keeps messages so multiple independent consumers can read the same stream and replay history. Durability and replay are first-class.

## HLD

Producers → Topics/Partitions on Brokers → Consumer Groups. Order is guaranteed **within a partition**. Modern Kafka uses **KRaft** (not ZooKeeper). Replication uses a Leader + Followers and an **ISR** (In-Sync Replica set).

## LLD Highlights

- Partitions are log segments (`.log`, `.index`, `.timeindex`) with sequential appends.
- OS page cache + zero-copy (`sendfile`) for throughput.
- Offsets live in `__consumer_offsets`. Prefer cooperative rebalancing at scale.

## Delivery Guarantees

- Producer `acks=0|1|all` — use `acks=all` + `min.insync.replicas` for durability.
- Idempotent producers avoid retry duplicates; transactions enable exactly-once pipelines.
- Consumer: at-least-once + idempotent downstream is the default sane choice.

## Retention vs Compaction

- Time/size retention for event streams.
- `cleanup.policy=compact` keeps latest value per key (state snapshots / changelogs).

## Partitioning

Key by entity ID for per-entity ordering. Size partition count to real consumer parallelism.

## Production Lessons

Monitor consumer lag and partition skew. Don't use Kafka as a simple task queue. Set retention/compaction on day one. Store large blobs elsewhere and put references in records.

## Closing Thought

Treat the durable, ordered, replayable log as the product — sequential I/O, page cache, zero-copy, ISR, and offsets-as-a-topic all follow from that idea.
'''

CDN_CONTENT = r'''# CDN Demystified: A Deep Dive From Two Decades in the Trenches

A CDN trades storage duplication (many geographic copies) for latency reduction — and absorbs spikes/attacks before they hit your origin. Physics doesn't negotiate: distance dominates RTT more than app code.

## HLD

User → DNS/Anycast → nearest Edge PoP → (hit) serve, or (miss) Origin Shield → Origin.

- **PoP / edge** hold cached content close to users.
- **Origin shield** collapses multi-PoP misses into one origin fetch.
- **Anycast** (BGP) usually beats DNS routing for outage reaction.

## LLD Highlights

- **Cache key** design is the #1 incident source — strip junk query params, use `Vary` carefully, never key public content on session cookies.
- **Request collapsing** prevents thundering herds on expiry.
- Edge **TLS termination** + warm origin pools often beat caching for dynamic traffic.
- Consistent hashing, gzip/brotli, HTTP/2/3 at the edge.

## TTL vs Purge

- TTL via `Cache-Control` / `s-maxage` / ETag revalidation — passive expiry.
- Purge/invalidation — active forget-now (URL, surrogate-key/tag, or wildcard).
- Prefer generous TTLs + targeted tag purges over tiny TTLs "just in case."

## Push vs Pull / Dynamic Acceleration

Pull CDNs are the common model. Push for pre-warmed large media. Even uncacheable APIs benefit from CDN backbone routing and edge TLS.

## Integration Checklist

```
Static hashed asset -> public, max-age=31536000, immutable
Personalized API    -> private, no-store
Shared occasional   -> public, s-maxage=60 + surrogate-key
```

## Production Lessons

Watch hit ratio. Never leak private responses via bad cache keys. Treat wildcard purge as rare. Verify stampede protection. Don't gut TTLs when you need a purge strategy.

## Closing Thought

Minimize the distance the request travels — cache keys, shields, collapsing, anycast, and tag invalidation all follow from that single idea.
'''

LAMBDA_CONTENT = r'''# AWS Lambda Demystified: A Deep Dive From Two Decades in the Trenches

Lambda is **compute as a pure function of an event** — billed to the millisecond, with the platform handling provisioning, scaling, and teardown. Cold starts, statelessness, timeouts, and concurrency limits all follow from that model.

## HLD

Event Source → Lambda Service → Function → Response. Triggers include API Gateway, S3, SQS, DynamoDB Streams, EventBridge. Push sources invoke directly; poll sources (SQS/Kinesis/Streams) use Lambda's internal poller with batches. Scope the IAM execution role tightly per function.

## LLD

- **Firecracker microVMs** provide fast, secure multi-tenant isolation.
- Lifecycle: **INIT (cold)** → **INVOKE** → freeze/reuse (**warm**) → **SHUTDOWN**.
- Put expensive setup in global/module scope so warm invokes amortize it.
- Concurrency: on-demand (shared quotas), **reserved** (cap/guarantee), **provisioned** (always-warm, no cold starts for that pool).
- VPC ENI cold-start pain is largely mitigated by Hyperplane, but history still matters.

## Statelessness

Never rely on `/tmp` or in-memory state across invocations. Persist in DynamoDB/S3/RDS/Redis.

## Integration

1. Know sync vs async vs poll retry semantics; async needs DLQ/failure destination.
2. Global-scope clients/config.
3. Benchmark memory — more memory = more CPU; can be faster and cheaper.
4. Tight IAM; realistic timeouts; partial batch failure reporting for SQS.

## Production Lessons

Use RDS Proxy under spike concurrency. Reserve concurrency for limited downstreams. Lean packages. Don't force long-running/large-payload work into Lambda's 15-minute ceiling.

## Closing Thought

Run exactly when needed, for exactly as long as needed — Firecracker, freeze/reuse, and concurrency dials are the natural levers of that idea.
'''

EC2_CONTENT = r'''# AWS EC2 Demystified: A Deep Dive From Two Decades in the Trenches

EC2 turns CapEx (buy servers) into OpEx (rent compute by the second/hour). It remains the foundation under most AWS compute — including "serverless" stacks.

## HLD

Region → AZs → VPC → Subnets → Instances (+ Security Groups, EBS). Spread across AZs. Use AMIs, instance families (t3/m6i/c6i/r6i), ALB/NLB, and Auto Scaling Groups.

## LLD

- **Nitro** offloads networking/storage/security to dedicated cards — near bare-metal performance + hardware isolation.
- **Instance store** = ephemeral local disk; **EBS** = durable network block storage (gp3/io2/etc.), incremental snapshots via S3.
- **IMDSv2** for role credentials — disable v1 to block SSRF credential theft.
- Placement groups: cluster / spread / partition.

## Scaling & Pricing

ASG policies: target tracking, step, scheduled. Prefer ELB app health checks. Mix On-Demand, Reserved/Savings Plans, and Spot as architecture — not just billing.

## Integration

Golden AMI → Launch Template (IAM role, SG, user-data) → ASG → ALB across AZs. Private subnets for app nodes; public only for the load balancer.

## Production Lessons

Don't put durable data on instance store. IMDSv2. Multi-AZ. Right-size before scaling wide. Tag for cost. Handle Spot interruptions gracefully.

## Closing Thought

Composable, disposable compute primitives — Nitro, EBS lifecycle independence, IAM roles, ASGs — all follow from elasticity as a first-class idea.
'''

AGENTIC_CONTENT = r'''# Your Context Window Is a Bank Account — Stop Overdrawing It

Token consumption in an agentic IDE is resource optimization in a new costume — the scarce resource is the model's context window. Context only gets debited within a session unless you actively prune it.

## HLD Consumers

System/tools → memory files → conversation history → file reads → command outputs → model reasoning. File reads are the biggest controllable cost.

## LLD

Tokens ≠ lines. Prefer memory files over fragile history. Structure prompts for **prompt caching** (stable prefix first). Use **sub-agents** to return summaries, not raw exploration.

## Practices

Ignore noise dirs. Lean memory. Search-then-read-narrowly. Filter logs. Scoped sessions. Prefer diffs. Match model to task.

## Closing

Treat context as scarce — caching, sub-agents, ignores, and lean memory all follow from that.
'''


class Command(BaseCommand):
    help = 'Seed / update featured blog posts (Redis, Kafka, CDN, EC2, Lambda, Agentic, etc.)'

    def handle(self, *args, **options):
        posts = [
            {
                'slug': 'redis-demystified',
                'title': 'The One Trade-Off That Explains All of Redis',
                'excerpt': (
                    'Why Redis exists, how it’s built (HLD + LLD), persistence, pub/sub, '
                    'OTP patterns, TTL vs eviction — the mental model I wish I had on day one.'
                ),
                'content': REDIS_CONTENT,
            },
            {
                'slug': 'kafka-demystified',
                'title': "Kafka Isn't a Queue — It's a Commit Log",
                'excerpt': (
                    'Kafka as a distributed commit log — HLD, LLD, acks, ISR, consumer groups, '
                    'retention vs compaction, and how to integrate without overengineering.'
                ),
                'content': KAFKA_CONTENT,
            },
            {
                'slug': 'cdn-demystified',
                'title': "Don't Make the Request Travel Farther Than It Has To",
                'excerpt': (
                    'Why CDNs exist, edge PoPs, cache keys, origin shields, TTL vs purge, '
                    'anycast routing — the mental model behind real production CDN incidents.'
                ),
                'content': CDN_CONTENT,
            },
            {
                'slug': 'aws-ec2-demystified',
                'title': "EC2 Still Runs the Cloud (Even When You Don't See It)",
                'excerpt': (
                    'Elastic compute as the foundation under AWS — Nitro, EBS vs instance store, '
                    'IMDSv2, ASGs, Spot pricing, and production lessons from two decades in the trenches.'
                ),
                'content': EC2_CONTENT,
            },
            {
                'slug': 'aws-lambda-demystified',
                'title': 'Billed to the Millisecond: Inside AWS Lambda',
                'excerpt': (
                    'Compute as a pure function of an event — Firecracker, cold starts, '
                    'concurrency, VPC pitfalls, and how to integrate Lambda without the classic traps.'
                ),
                'content': LAMBDA_CONTENT,
            },
            {
                'slug': 'agentic-ides-token-economy',
                'title': 'Your Context Window Is a Bank Account — Stop Overdrawing It',
                'excerpt': (
                    'Token hygiene for Cursor, Claude Code & friends — what burns context, '
                    'prompt caching, sub-agents, and how to keep sessions fast, cheap, and sharp.'
                ),
                'content': AGENTIC_CONTENT,
            },
        ]
        for data in posts:
            post, created = BlogPost.objects.update_or_create(
                slug=data['slug'],
                defaults={
                    'title': data['title'],
                    'excerpt': data['excerpt'],
                    'content': data['content'],
                },
            )
            action = 'Created' if created else 'Updated'
            self.stdout.write(self.style.SUCCESS(f'{action} blog post: {post.slug}'))
