# Philos Backend

Express + TypeScript + Drizzle + PostgreSQL (Neon).

## Setup

```bash
cd backend
cp .env.example .env
# set DATABASE_URL to your Neon philosophy database
npm install
npm run dev
```

## Env

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon Postgres connection string |
| `PORT` | Server port (default `3000`) |
| `CORS_ORIGIN` | Allowed frontend origin |
| `JWT_SECRET` | Secret for JWT (used in later auth phase) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled server |
| `npm run db:studio` | Open Drizzle Studio |

## Health

`GET /health` — returns `{ ok: true, db: true }` when Neon is reachable.

Business API routes (`/api/v1/*`) are not implemented yet — see `API.md`.
