# Philos Frontend

Vite + React + TypeScript. UI: MUI + SCSS. Server state: TanStack Query. Client UI state: Redux (locale, pagination).

## Environment

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:3000/api/v1
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

- **`VITE_API_URL`** — Express backend (auth, philosophers, articles).
- Supabase env vars may remain unused until `supabaseClient` is removed entirely in a later cleanup.

## Auth

- JWT stored in `localStorage` (`philos_access_token`).
- axios (`src/api/client.ts`) attaches `Authorization: Bearer <token>`.
- Session via React Query: `queryKeys.auth.session()` → `GET /auth/session`.
- Hooks: `useLogin`, `useSignupMutation`, `useLogout`, `useAuthSession`, `useIsAuthenticated`, `useIsAdmin`.

## Philosophers

- List / featured / bio use `VITE_API_URL` via `modules/philosophers/api/philosophersApi.ts`.
- Hooks: `usePhilosophersList`, `useFeaturedPhilosophers`, `usePhilosopherBio`.
- Query keys: `queryKeys.philosophers.*`.

## Articles

- List / create / detail / reactions / comments / related / bookmarks use `VITE_API_URL` via `modules/articles/api/articlesApi.ts`.
- Hooks: `useArticlesList`, `useCreateArticle`, plus detail hooks under `modules/article-details/hooks/`.
- Query keys: `queryKeys.articles.*`.

## Users / profiles

- Public author profile: `GET /users/:id/profile` via `modules/profile/api/usersApi.ts`.
- Page route: `/users/:id` (`UserProfile`) — username, avatar, bio (no auth required).
- Own account profile remains `/profile/:id` (protected).
- Query keys: `queryKeys.users.profile(id)`.

## Adding a feature API (React Query convention)

1. **Keys** — extend `src/api/queryKeys.ts` (never hard-code key arrays in hooks).
2. **API fn** — plain async in `modules/<feature>/api/*.ts` using `apiClient` (no React).
3. **Hooks** — `useQuery` / `useMutation` in `modules/<feature>/hooks/`; on success `invalidateQueries` / `setQueryData`.
4. **UI** — call hooks only; keep MUI + existing SCSS modules.

## Scripts

```bash
npm install
npm run dev
```
