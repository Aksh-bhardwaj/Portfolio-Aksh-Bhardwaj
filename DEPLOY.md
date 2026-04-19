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
    Dockerfile                 # Railway build: official Python image (avoids Railpack “python: not found”)
    requirements.txt            # includes: -r requirements-render.txt
    requirements-render.txt     # lean prod deps (name is historical; not Render-only)
    runtime.txt                 # used if you ever switch back to Railpack; optional with Docker
    Procfile                    # used if you start without Docker; Docker uses CMD in Dockerfile
    railway.json                # uses DOCKERFILE builder (see below)
```

### Checklist (order matters)

1. **Root directory = `backend` (Source settings).** If this is wrong, Docker / `requirements.txt` / `manage.py` are not in the build context.
   - On Windows, save **`requirements*.txt` as UTF-8** (Cursor/VS Code: bottom status bar → encoding). **Do not use “UTF-16”** — `pip` then fails with `\x00` between letters.
2. **This repo uses a `backend/Dockerfile` + `railway.json` with `"builder": "DOCKERFILE"`.** The image is `python:3.11-slim`; `pip install -r requirements.txt` runs **inside** that image, so **`python` always exists** — this fixes endless `pip: not found` / `python: not found` from Railpack ordering.
3. **After pushing:** Railway → **Settings → Build** → ensure **Custom Build Command is empty** (Docker doesn’t need it). **Settings → Deploy** → you can clear **Custom Start Command** so the container uses the **Dockerfile `CMD`** (migrate → `ensure_superuser` → gunicorn); if you leave a start command, it must not reference a missing `python` before the image exists.
4. **Variables:** remove **`RAILPACK_INSTALL_CMD`** if you added it earlier — it only affects Railpack and can break installs.
5. **`backend/runtime.txt`** / **`Procfile`** — still fine for documentation or non-Docker hosts; Docker does not rely on `runtime.txt`.
6. **Redeploy** after `git push`.

### First-time service setup

1. **New** → **GitHub** → select this repo and add a **web** service (root directory `backend` and install behavior as in the checklist above).
2. Add **PostgreSQL** (or Railway Postgres). Link it so **`DATABASE_URL`** is injected, or paste the URL manually.
3. **Service start:** with **Dockerfile** deploys, the **Dockerfile `CMD`** runs migrate → `ensure_superuser` → gunicorn. Leave **Custom Start Command** empty unless you intentionally override it.

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
