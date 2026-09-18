import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import TiltCard from './TiltCard';
import { LOCAL_BLOG_POSTS, mergeBlogPosts } from '../data/blogPosts';

const Blog = ({ onSelectPost }) => {
  const [posts, setPosts] = useState(LOCAL_BLOG_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('blogs/')
      .then((res) => {
        setPosts(mergeBlogPosts(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setPosts(LOCAL_BLOG_POSTS);
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="relative overflow-hidden py-24">
      <div className="section-mesh" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeader
          eyebrow="Writing"
          title="Experiences"
          accent="& Blog"
          align="center"
          subtitle="Notes from building, shipping, and learning in production."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <TiltCard key={post.id || post.slug} max={6}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="depth-card group flex h-full flex-col p-6"
              >
                <div className="mb-4 flex items-center gap-3 font-mono text-xs text-emerald-400">
                  <Calendar size={14} />
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <h3 className="font-display mb-4 text-xl font-semibold text-white transition-colors group-hover:text-cyan-200">
                  {post.title}
                </h3>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-zinc-400">
                  {post.excerpt ||
                    'Click to read more about this experience and the technical challenges overcome.'}
                </p>
                <button
                  onClick={() => onSelectPost(post)}
                  className="inline-flex items-center gap-2 font-semibold text-white transition-all group-hover:text-emerald-400"
                >
                  Read Post <ArrowUpRight size={18} />
                </button>
              </motion.article>
            </TiltCard>
          ))}

          {posts.length === 0 && !loading && (
            <div className="col-span-full py-12 text-center text-zinc-500">
              No posts available yet. Check back soon!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
