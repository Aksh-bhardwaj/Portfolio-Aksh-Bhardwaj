# Explicit Python image — avoids Railpack install ordering issues ("python: not found").
# Railway uses this automatically when Root Directory = backend (see railway.json).

FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install from requirements-render.txt only (UTF-8; avoids Windows UTF-16 issues on requirements.txt)
COPY requirements-render.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements-render.txt

COPY . .

EXPOSE 8000

# Railway sets PORT at runtime
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py ensure_superuser && exec gunicorn portfolio_backend.wsgi:application --bind 0.0.0.0:${PORT:-8000}"]
