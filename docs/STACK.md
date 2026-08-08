# Philos Stack

Monolith repo: `frontend/` + `backend/`. Supabase is replaced by our own backend.

---

## Layout

```
philosophy/
├── frontend/          # Vite + React — separate package.json
├── backend/           # Express + Drizzle — separate package.json
│   ├── src/           # app entry, config, db schema (APIs later)
│   ├── API.md
│   └── schema.sql
└── docs/
    └── STACK.md
```

One repo, separate package per folder (no shared workspace / no shared Zod package).

---

## Backend

| Layer | Tool |
|-------|------|
| Runtime | Node.js |
| Framework | Express |
| Database | PostgreSQL (Neon) |
| ORM | Drizzle |
| Validation | Zod (backend-only) |
| Auth | JWT + Auth middleware (Bearer token) |

---

## Frontend

| Layer | Tool |
|-------|------|
| Framework | Vite + React + TypeScript |
| Server state | TanStack Query |
| HTTP client | axios instance → backend API (attach `Authorization` header) |
| Client state | Redux |
| Validation | Zod (frontend-only) |
| Styling | MUI + SCSS (unchanged) |
| i18n | i18next (unchanged) |

---

## Data flow

```
Frontend on Vercel (TanStack Query + axios)
        │
        ▼
Backend on Render (Express + Zod + Auth middleware)
        │
        ▼
PostgreSQL on Neon (via Drizzle)
```

---

## Conventions

- All frontend API calls go through a single **axios instance**.
- **TanStack Query** for server state (lists, details, mutations).
- **Redux** for client state only (e.g. locale / pagination) — not a replacement for Query.
- **Zod** is separate in frontend and backend (no shared package for now).
- Protected routes are enforced via **Auth middleware** that verifies the JWT.
- JWT is stored on the client (e.g. `localStorage`) and sent as `Authorization: Bearer <token>`.
- CORS on the backend must allow the Vercel origin and the `Authorization` header (no cookie credentials required for auth).

---

## Auth (decided)

**JWT in header** (fits Vercel frontend + Render backend split):

1. User logs in → backend verifies credentials → signs a JWT (user id, expiry, …) → returns it in the response body.
2. Frontend stores the token (e.g. `localStorage`).
3. axios interceptor attaches `Authorization: Bearer <token>` on each API request.
4. Auth middleware verifies the JWT signature/expiry → attaches the user (or rejects with 401).
5. Logout → frontend deletes the token (optional: short expiry and/or server-side revoke list later if needed).

Not using cookie sessions. CORS is still required for cross-origin calls, but without `SameSite=None` / cookie credential setup.

---

## Deployment (decided)

| Part | Host |
|------|------|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon (PostgreSQL) |

Different origins → configure CORS to allow the Vercel origin and the `Authorization` header.
