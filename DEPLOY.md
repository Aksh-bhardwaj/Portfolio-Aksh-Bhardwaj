# Deploying this portfolio (Railway API + Vercel frontend)

Architecture: **Vercel** serves the static **React/Vite** app; **Railway** runs **Django + Gunicorn** and typically **PostgreSQL**.

**Backend hosting:** This guide assumes **Railway** for the API. The repo root file **`render.yaml`** is only for [Render](https://render.com) if you ever deploy there — **Railway ignores it**, so do not copy Render tutorials into Railway’s build settings.

---

## 1. Backend on Railway

### Repo layout (must look like this)

```text
repo/
  backend/
    manage.py
    requirements.txt            # includes: -r requirements-render.txt
    requirements-render.txt     # lean prod deps (name is historical; not Render-only)
    runtime.txt                 # e.g. python-3.11.9 (tells Railpack: use Python)
    Procfile                    # start: migrate + gunicorn (see below)
```

### Checklist (order matters)

1. **`backend/runtime.txt`** — one line, e.g. `python-3.11.9` (already in this repo).
2. **`backend/requirements-render.txt`** — name and path must be exact; it is the file `requirements.txt` includes.
3. **Railway → Settings → Root directory = `backend`.** If this is wrong or empty, the build may not use Python or the right folder.
4. **`backend/Procfile`** — this repo uses:
   `migrate` → `ensure_superuser` → `gunicorn` (for DB + blog admin). A **gunicorn-only** Procfile is not enough for first-time DB setup.
5. **Build / install (fix for `pip: not found` — logs show `sh -c pip install ...`):**
   - Railway **Settings → Build** must **not** use bare `pip` or `pip3`. Those binaries are often missing in the build container.
   - **Best:** clear **Install command** (and any custom install line) so Railpack uses its default from `requirements.txt`.
   - **If something still forces the wrong command**, add a **Railway variable** on the **same** service (available during build):
     **`RAILPACK_INSTALL_CMD`** = `python -m pip install -r requirements.txt`  
     (Railpack’s real name is `RAILPACK_INSTALL_CMD`, not `INSTALL_COMMAND`.)
   - **Manual install override** (only if you type it yourself): `python -m pip install -r requirements.txt` — never `pip install -r requirements-render.txt` alone.
6. **Redeploy** after a `git push` or use **Redeploy** in Railway.

### First-time service setup

1. **New** → **GitHub** → select this repo and add a **web** service (root directory `backend` and install behavior as in the checklist above).
2. Add **PostgreSQL** (or Railway Postgres). Link it so **`DATABASE_URL`** is injected, or paste the URL manually.
3. **Service start:** leave default so Railway uses **`backend/Procfile`**, or set start command to:
     ```bash
     python manage.py migrate --noinput && python manage.py ensure_superuser && gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:$PORT
     ```

4. Set **environment variables** on the Railway web service:

   | Variable | Purpose |
   |----------|---------|
   | `DATABASE_URL` | Provided by Railway Postgres when linked, or paste manually |
   | `SECRET_KEY` | Long random string (never commit) |
   | `DEBUG` | `False` |
   | `ALLOWED_HOSTS` | Your API hostname only, comma-separated — e.g. `your-api.up.railway.app` (required when `DEBUG=False`) |
   | `ADMIN_USERNAME` | Studio/admin username |
   | `ADMIN_EMAIL` | Admin email |
   | `ADMIN_PASSWORD` | Strong password (studio JWT login + Django admin) |
   | `EMAIL_HOST_USER` | Optional; Gmail SMTP |
   | `EMAIL_HOST_PASSWORD` | Optional; app password |
   | `CONTACT_NOTIFY_EMAIL` | Where contact-form submissions are mailed (optional) |

5. Deploy and wait for **migrate + ensure_superuser + gunicorn** to succeed.

6. Open the Railway **public HTTPS URL** for the service (e.g. `https://your-api.up.railway.app`). API base for the SPA should be **`https://your-api.up.railway.app/api/`** (trailing slash matches `api.js`).

Optional: `SKIP_DB_IPV4=1` if IPv4 resolution causes issues with your DB host.

---

## 2. Frontend on Vercel

1. **New Project** → import the same repo.
2. Configure:
   - **Root directory:** `frontend`
   - **Framework preset:** Vite (or Other)
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. **Environment variables**

   | Variable | Example |
   |----------|---------|
   | `VITE_API_URL` | `https://your-api.up.railway.app/api/` |

4. Deploy. The included `vercel.json` rewrites SPA routes to `index.html`.

---

## 3. Local reference

See `frontend/.env.example` and `backend/.env.example` for variable names.

Studio (blog editor): `https://your-vercel-domain/studio` — login with `ADMIN_*` credentials.

---

## 4. Before `git push`

Do not commit: `.env`, `.env.local`, `*.sqlite3`, `node_modules/`, `dist/`, `venv/` (see root `.gitignore`). Run `git status` and ensure those paths are not staged.

Production settings require `SECRET_KEY`, `ALLOWED_HOSTS`, and a non-SQLite `DATABASE_URL` when `DEBUG=False` — see `backend/portfolio_backend/settings.py`. Never put real secrets in tracked `.py` files; use env / host dashboards only.
