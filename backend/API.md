# Philos API Documentation

REST API for the Philos app. Designed to replace Supabase PostgREST + Auth when migrating to **Next.js + SQL Server**.

**Base URL:** `/api/v1`  
**Database schema:** [`schema.sql`](./schema.sql)  
**Tech stack guide:** [`docs/STACK.md`](../docs/STACK.md)

---

## Tech stack

| Layer | Tool |
|-------|------|
| Frontend HTTP | **axios** (`withCredentials: true` for session cookie) |
| Frontend data fetching | **TanStack Query** (`useQuery` / `useMutation` wrapping axios) |
| Backend ORM | **Drizzle** (queries inside Next.js `route.ts` handlers) |
| Backend framework | Next.js App Router (`app/api/v1/`) |
| Database | SQL Server |
| Validation | Zod |
| Auth | JWT via `/api/v1/auth/*` — see [STACK.md](../docs/STACK.md) |

---

## Table of contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Common conventions](#common-conventions)
4. [Auth endpoints](#auth-endpoints)
5. [Philosophers](#philosophers)
6. [Articles](#articles)
7. [Reactions](#reactions)
8. [Comments](#comments)
9. [Profiles](#profiles)
10. [Bookmarks](#bookmarks)
11. [Schools](#schools) *(planned)*
12. [Books](#books) *(planned)*
13. [Timeline](#timeline) *(planned)*
14. [Frontend mapping](#frontend-mapping)

---

## Overview

| Item | Value |
|------|-------|
| Protocol | HTTPS |
| Format | JSON (`Content-Type: application/json`) |
| Auth | JWT in `httpOnly` cookie **or** `Authorization: Bearer <token>` |
| Versioning | URL prefix `/api/v1` |
| Pagination | `page` + `pageSize` query params |
| Dates | ISO 8601 UTC (`2025-06-10T12:00:00.000Z`) |
| IDs | `UNIQUEIDENTIFIER` (UUID) for users/articles; `INT` for philosophers/books/schools |

---

## Authentication

### Public endpoints
No token required. Examples: list philosophers, list published articles, login, signup.

### Protected endpoints
Require a valid session. Return `401 Unauthorized` if missing or expired.

| Header | Example |
|--------|---------|
| Cookie | `session=<jwt>` (preferred) |
| Authorization | `Bearer eyJhbGciOiJIUzI1NiIs...` |

### Roles (future)
Currently all authenticated users share the same role. Admin-only endpoints can be added later.

---

## Common conventions

### Success responses

```json
// Single resource
{ "data": { ... } }

// List with pagination
{
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "pageSize": 12,
    "total": 120,
    "totalPages": 10
  }
}

// Mutation with message
{ "data": { ... }, "message": "Article created successfully" }
```

### Error responses

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": [
      { "field": "title", "message": "Title is required" }
    ]
  }
}
```

### HTTP status codes

| Code | Meaning |
|------|---------|
| `200` | OK |
| `201` | Created |
| `204` | No content (delete success) |
| `400` | Bad request / validation error |
| `401` | Not authenticated |
| `403` | Forbidden (not owner) |
| `404` | Resource not found |
| `409` | Conflict (duplicate email/username) |
| `500` | Server error |

### Error codes

| Code | When |
|------|------|
| `VALIDATION_ERROR` | Request body/query failed validation |
| `UNAUTHORIZED` | Missing or invalid token |
| `FORBIDDEN` | Authenticated but not allowed |
| `NOT_FOUND` | Resource does not exist |
| `CONFLICT` | Duplicate email, username, etc. |
| `INTERNAL_ERROR` | Unexpected server failure |

---

## Auth endpoints

### POST `/api/v1/auth/signup`

Register a new user.

**Auth:** Public

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "secret123",
  "username": "plato_fan",
  "phone": "+201234567890"
}
```

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `email` | string | yes | Valid email, unique |
| `password` | string | yes | Min 6 characters |
| `username` | string | yes | Max 50 chars, unique |
| `phone` | string | no | Max 20 chars |

**Response `201`:**

```json
{
  "data": {
    "user": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "user@example.com"
    }
  },
  "message": "Account created. Please confirm your email."
}
```

**Errors:** `409` if email or username already exists.

**Replaces:** `signupService.signupUser` → `supabase.auth.signUp`

---

### POST `/api/v1/auth/login`

Sign in with email and password.

**Auth:** Public

**Request body:**

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

**Response `200`:**

```json
{
  "data": {
    "user": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "user@example.com",
      "username": "plato_fan",
      "avatarUrl": null
    }
  }
}
```

**Headers:** `Set-Cookie: session=<jwt>; HttpOnly; Secure; SameSite=Lax`

**Errors:** `401` invalid credentials, `403` email not confirmed.

**Replaces:** `login.tsx` → `supabase.auth.signInWithPassword`

---

### POST `/api/v1/auth/logout`

Invalidate the current session.

**Auth:** Required

**Response `204`:** No body. Clears session cookie.

**Replaces:** `useAuth.signOut` → `supabase.auth.signOut`

---

### GET `/api/v1/auth/session`

Return the current authenticated user, or `401` if not logged in.

**Auth:** Optional (returns `401` when absent)

**Response `200`:**

```json
{
  "data": {
    "user": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "email": "user@example.com",
      "username": "plato_fan",
      "avatarUrl": null
    }
  }
}
```

**Replaces:** `getSession`, `ProtectedRoute`, `getCurrentUser`

---

### POST `/api/v1/auth/forgot-password`

Send a password reset email.

**Auth:** Public

**Request body:**

```json
{
  "email": "user@example.com"
}
```

**Response `200`:**

```json
{
  "message": "If that email exists, a reset link has been sent."
}
```

Always returns `200` to avoid email enumeration.

**Replaces:** `login.tsx` → `supabase.auth.resetPasswordForEmail`

---

### POST `/api/v1/auth/reset-password`

Set a new password using a reset token from the email link.

**Auth:** Reset token (query `?token=...` or body)

**Request body:**

```json
{
  "token": "reset-token-from-email",
  "password": "newSecret123"
}
```

**Response `200`:**

```json
{
  "message": "Password updated successfully"
}
```

**Errors:** `400` invalid/expired token.

**Replaces:** `reset-password.tsx` → `supabase.auth.updateUser`

---

## Philosophers

### GET `/api/v1/philosophers`

Paginated list of philosophers. Supports search and filters.

**Auth:** Public

**Query parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `pageSize` | number | `12` | Items per page |
| `search` | string | — | Search `name_en`, `name_ar`, descriptions |
| `era` | string | — | `ancient`, `medieval`, `earlyModern`, `modern`, `contemporary` |
| `school` | string | — | `idealism`, `materialism`, `existentialism`, `stoicism`, `epicureanism`, `rationalism`, `empiricism` |
| `featured` | boolean | `false` | If `true`, return featured list (ignores pagination) |
| `limit` | number | `3` | Used when `featured=true` |

**Response `200`:**

```json
{
  "data": [
    {
      "id": 1,
      "name_en": "Plato",
      "name_ar": "أفلاطون",
      "birth": -428,
      "death": -348,
      "era_en": "Ancient",
      "era_ar": "القديم",
      "nationality_en": "Greek",
      "nationality_ar": "يوناني",
      "school_en": "Idealism",
      "school_ar": "المثالية",
      "quote_en": "...",
      "quote_ar": "...",
      "short_description_en": "...",
      "short_description_ar": "...",
      "image": "https://example.com/plato.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 12,
    "total": 48,
    "totalPages": 4
  }
}
```

**Replaces:** `Philosophers.tsx`, `FeaturedPhilosophers.tsx` → `from('Philosophers')`

---

### GET `/api/v1/philosophers/:id`

Single philosopher card data (summary fields).

**Auth:** Public

**Response `200`:**

```json
{
  "data": {
    "id": 1,
    "name_en": "Plato",
    "name_ar": "أفلاطون",
    "birth": -428,
    "death": -348,
    "era_en": "Ancient",
    "era_ar": "القديم",
    "school_en": "Idealism",
    "school_ar": "المثالية",
    "short_description_en": "...",
    "short_description_ar": "...",
    "image": "https://example.com/plato.jpg"
  }
}
```

**Errors:** `404` philosopher not found.

**Note:** Removes need to pass philosopher via React Router `state`.

---

### GET `/api/v1/philosophers/:id/bio`

Full bilingual biography sections for the philosopher details page.

**Auth:** Public

**Response `200`:**

```json
{
  "data": {
    "philosopher_id": 1,
    "name_en": "Plato",
    "name_ar": "أفلاطون",
    "birth": -428,
    "death": -348,
    "nationality_en": "Greek",
    "nationality_ar": "يوناني",
    "era_en": "Ancient",
    "era_ar": "القديم",
    "school_en": "Idealism",
    "school_ar": "المثالية",
    "intro_en": "...",
    "intro_ar": "...",
    "early_life_en": "...",
    "early_life_ar": "...",
    "education_en": "...",
    "education_ar": "...",
    "books_en": "...",
    "books_ar": "...",
    "metaphysics_en": "...",
    "metaphysics_ar": "...",
    "epistemology_en": "...",
    "epistemology_ar": "...",
    "ethics_en": "...",
    "ethics_ar": "...",
    "politics_en": "...",
    "politics_ar": "...",
    "influence_legacy_en": "...",
    "influence_legacy_ar": "...",
    "personal_life_en": "...",
    "personal_life_ar": "...",
    "death_en": "...",
    "death_ar": "...",
    "further_reading_en": "...",
    "further_reading_ar": "...",
    "references_en": "...",
    "references_ar": "..."
  }
}
```

**Replaces:** `PhilosopherDetails.tsx` → `from('philosopher_bio')`

---

## Articles

### GET `/api/v1/articles`

List published articles with author info and reaction counts.

**Auth:** Public

**Query parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | `1` | Page number |
| `pageSize` | number | `20` | Items per page |
| `category` | string | — | Filter by category |
| `authorId` | uuid | — | Filter by author |

**Response `200`:**

```json
{
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "The Allegory of the Cave",
      "subtitle": "Shadows and reality",
      "content": "...",
      "category": "Metaphysics",
      "state": "published",
      "author_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "created_at": "2025-01-15T10:30:00.000Z",
      "profiles": {
        "username": "plato_fan",
        "bio": "Philosophy enthusiast"
      },
      "article_reaction_counts": {
        "likes": 12,
        "dislikes": 2
      }
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 35,
    "totalPages": 2
  }
}
```

**Note:** Only returns `state = 'published'` for public list.

**Replaces:** `useArticles.ts` → `from('articles').eq('state', 'published')`

---

### GET `/api/v1/articles/:id`

Single article by ID.

**Auth:** Public (drafts only visible to author)

**Response `200`:**

```json
{
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "The Allegory of the Cave",
    "subtitle": "Shadows and reality",
    "content": "Full article text...",
    "category": "Metaphysics",
    "state": "published",
    "author_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "created_at": "2025-01-15T10:30:00.000Z"
  }
}
```

**Replaces:** `articleService.fetchArticleDetails`

---

### POST `/api/v1/articles`

Create a new article. `author_id` is set server-side from the session.

**Auth:** Required

**Request body:**

```json
{
  "title": "The Allegory of the Cave",
  "subtitle": "Shadows and reality",
  "content": "Full article text...",
  "category": "Metaphysics",
  "state": "draft"
}
```

| Field | Type | Required | Values |
|-------|------|----------|--------|
| `title` | string | yes | Max 300 chars |
| `subtitle` | string | yes | Max 500 chars |
| `content` | string | yes | — |
| `category` | string | yes | See categories below |
| `state` | string | yes | `draft` \| `published` |

**Categories:** `Philosophy of Mind`, `Ethics`, `Metaphysics`, `Epistemology`, `Logic`, `Aesthetics`, `Political Philosophy`, `Philosophy of Science`, `Philosophy of Religion`

**Response `201`:**

```json
{
  "data": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "message": "Article created successfully"
}
```

**Replaces:** `AddArticle.tsx` → `from('articles').insert(...)`

---

### PATCH `/api/v1/articles/:id`

Update an article. Only the author may edit.

**Auth:** Required (author only)

**Request body:** (all fields optional)

```json
{
  "title": "Updated title",
  "subtitle": "Updated subtitle",
  "content": "Updated content",
  "category": "Ethics",
  "state": "published"
}
```

**Response `200`:**

```json
{
  "data": { "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6" },
  "message": "Article updated successfully"
}
```

**Errors:** `403` if not the author, `404` if not found.

---

### GET `/api/v1/articles/:id/related`

Related articles (same category, excluding current).

**Auth:** Public

**Query parameters:**

| Param | Type | Default |
|-------|------|---------|
| `limit` | number | `3` |

**Response `200`:**

```json
{
  "data": [
    {
      "id": "...",
      "title": "...",
      "subtitle": "...",
      "category": "Metaphysics",
      "created_at": "..."
    }
  ]
}
```

**Replaces:** `RelatedArticles` placeholder component.

---

## Reactions

### GET `/api/v1/articles/:id/reactions`

Like/dislike counts for an article.

**Auth:** Public

**Response `200`:**

```json
{
  "data": {
    "likes": 12,
    "dislikes": 2
  }
}
```

**Replaces:** `articleService.getReactionCounts` → `article_reaction_counts`

---

### PUT `/api/v1/articles/:id/reactions`

Set or update the current user's reaction (upsert).

**Auth:** Required

**Request body:**

```json
{
  "reaction": "like"
}
```

| Value | Meaning |
|-------|---------|
| `like` | Like the article |
| `dislike` | Dislike the article |

**Response `200`:**

```json
{
  "data": {
    "likes": 13,
    "dislikes": 2
  }
}
```

**Errors:** `401` if not logged in.

**Replaces:** `articleService.addReaction` → `article_reactions` upsert

---

### DELETE `/api/v1/articles/:id/reactions`

Remove the current user's reaction.

**Auth:** Required

**Response `204`:** No body.

---

## Comments

### GET `/api/v1/articles/:id/comments`

Comments for an article, newest first.

**Auth:** Public

**Response `200`:**

```json
{
  "data": [
    {
      "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "content": "Great article!",
      "created_at": "2025-02-01T14:00:00.000Z",
      "user_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "article_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "profiles": {
        "username": "aristotle"
      }
    }
  ]
}
```

**Replaces:** `commentService.fetchComments`

---

### POST `/api/v1/articles/:id/comments`

Add a comment to an article.

**Auth:** Required

**Request body:**

```json
{
  "content": "Great article!"
}
```

**Response `201`:**

```json
{
  "data": {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "content": "Great article!",
    "created_at": "2025-02-01T14:00:00.000Z",
    "user_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "article_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

**Replaces:** `commentService.addComment`

---

## Profiles

### GET `/api/v1/profiles/me`

Current user's profile with stats.

**Auth:** Required

**Response `200`:**

```json
{
  "data": {
    "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "username": "plato_fan",
    "full_name": "Plato Fan",
    "bio": "Philosophy enthusiast",
    "avatar_url": null,
    "articles_count": 5,
    "books_to_read_count": 3,
    "books_reading_count": 1,
    "books_read_count": 10,
    "books_favorites_count": 2,
    "created_at": "2024-06-01T00:00:00.000Z",
    "updated_at": "2025-06-10T00:00:00.000Z"
  }
}
```

**Replaces:** `useProfile.ts` → `profiles` for session user

---

### GET `/api/v1/profiles/:id`

Public profile by user ID (e.g. article author sidebar).

**Auth:** Public

**Response `200`:** Same shape as `/profiles/me` (without sensitive fields).

**Replaces:** `profileService.getProfileById`

---

### PATCH `/api/v1/profiles/me`

Update the current user's profile.

**Auth:** Required

**Request body:** (all optional)

```json
{
  "username": "new_username",
  "full_name": "New Name",
  "bio": "Updated bio",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

**Response `200`:**

```json
{
  "data": { "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7" },
  "message": "Profile updated successfully"
}
```

**Errors:** `409` if username taken.

---

## Bookmarks

### GET `/api/v1/users/me/bookmarks`

List bookmarked articles for the current user.

**Auth:** Required

**Response `200`:**

```json
{
  "data": [
    {
      "article_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "...",
      "subtitle": "...",
      "created_at": "2025-03-01T00:00:00.000Z"
    }
  ]
}
```

---

### POST `/api/v1/articles/:id/bookmark`

Bookmark an article.

**Auth:** Required

**Response `201`:** `{ "message": "Article bookmarked" }`

---

### DELETE `/api/v1/articles/:id/bookmark`

Remove a bookmark.

**Auth:** Required

**Response `204`:** No body.

**Replaces:** Local `isBookmarked` state in `ArticleDetails.tsx`

---

## Schools

*Planned — pages `/schools`, `/schools/:id` are stubs today.*

### GET `/api/v1/schools`

List all philosophical schools.

**Auth:** Public

**Response `200`:**

```json
{
  "data": [
    {
      "id": 1,
      "name_en": "Stoicism",
      "name_ar": "الرواقية",
      "slug": "stoicism",
      "description_en": "...",
      "description_ar": "...",
      "founded_period": "3rd century BC",
      "image": "https://..."
    }
  ]
}
```

---

### GET `/api/v1/schools/:id`

Single school with details.

**Auth:** Public

---

### GET `/api/v1/schools/:id/philosophers`

Philosophers belonging to a school.

**Auth:** Public

**Query:** `page`, `pageSize`

---

## Books

*Planned — page `/books` is a stub today.*

### GET `/api/v1/books`

List philosophy books.

**Auth:** Public

**Query:** `page`, `pageSize`, `search`

---

### GET `/api/v1/books/:id`

Single book details.

**Auth:** Public

---

### GET `/api/v1/users/me/books`

User's book lists.

**Auth:** Required

**Query:**

| Param | Values |
|-------|--------|
| `list` | `to_read`, `reading`, `read`, `favorite` |

---

### POST `/api/v1/users/me/books/:bookId`

Add a book to a list.

**Auth:** Required

**Request body:**

```json
{
  "listType": "to_read"
}
```

---

### DELETE `/api/v1/users/me/books/:bookId`

Remove a book from a list.

**Auth:** Required

**Query:** `list` (required)

---

## Timeline

*Planned — page `/timeline` is a stub today.*

### GET `/api/v1/timeline`

Philosophical events ordered by year.

**Auth:** Public

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `from` | number | Start year (e.g. `-500`) |
| `to` | number | End year (e.g. `2000`) |
| `philosopherId` | number | Filter by philosopher |
| `schoolId` | number | Filter by school |

**Response `200`:**

```json
{
  "data": [
    {
      "id": 1,
      "year": -428,
      "title_en": "Birth of Plato",
      "title_ar": "ولادة أفلاطون",
      "description_en": "...",
      "description_ar": "...",
      "philosopher_id": 1,
      "school_id": null
    }
  ]
}
```

---

## Frontend mapping

How each current Supabase call maps to the new API:

| Current code | New endpoint |
|--------------|--------------|
| `supabase.auth.signUp` | `POST /auth/signup` |
| `supabase.auth.signInWithPassword` | `POST /auth/login` |
| `supabase.auth.signOut` | `POST /auth/logout` |
| `supabase.auth.getSession` | `GET /auth/session` |
| `supabase.auth.resetPasswordForEmail` | `POST /auth/forgot-password` |
| `supabase.auth.updateUser({ password })` | `POST /auth/reset-password` |
| `from('Philosophers').range(...)` | `GET /philosophers?page&pageSize` |
| `from('Philosophers').limit(3)` | `GET /philosophers?featured=true&limit=3` |
| `from('philosopher_bio')` | `GET /philosophers/:id/bio` |
| `from('articles').eq('state','published')` | `GET /articles` |
| `from('articles').eq('id').single()` | `GET /articles/:id` |
| `from('articles').insert(...)` | `POST /articles` |
| `from('article_reaction_counts')` | `GET /articles/:id/reactions` |
| `from('article_reactions').upsert(...)` | `PUT /articles/:id/reactions` |
| `from('comments').select(...)` | `GET /articles/:id/comments` |
| `from('comments').insert(...)` | `POST /articles/:id/comments` |
| `from('profiles').eq('id')` | `GET /profiles/:id` or `GET /profiles/me` |

---

## Suggested Next.js route structure

```
app/api/v1/
├── auth/
│   ├── signup/route.ts
│   ├── login/route.ts
│   ├── logout/route.ts
│   ├── session/route.ts
│   ├── forgot-password/route.ts
│   └── reset-password/route.ts
├── philosophers/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       └── bio/route.ts
├── articles/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       ├── reactions/route.ts
│       ├── comments/route.ts
│       ├── bookmark/route.ts
│       └── related/route.ts
├── profiles/
│   ├── me/route.ts
│   └── [id]/route.ts
├── schools/
│   ├── route.ts
│   └── [id]/
│       ├── route.ts
│       └── philosophers/route.ts
├── books/
│   ├── route.ts
│   └── [id]/route.ts
├── users/me/
│   ├── bookmarks/route.ts
│   └── books/
│       ├── route.ts
│       └── [bookId]/route.ts
└── timeline/route.ts
```

---

## Endpoint summary

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| POST | `/auth/signup` | Public | Live feature |
| POST | `/auth/login` | Public | Live feature |
| POST | `/auth/logout` | User | Live feature |
| GET | `/auth/session` | Optional | Live feature |
| POST | `/auth/forgot-password` | Public | Live feature |
| POST | `/auth/reset-password` | Token | Live feature |
| GET | `/philosophers` | Public | Live feature |
| GET | `/philosophers/:id` | Public | Live feature |
| GET | `/philosophers/:id/bio` | Public | Live feature |
| GET | `/articles` | Public | Live feature |
| GET | `/articles/:id` | Public | Live feature |
| POST | `/articles` | User | Live feature |
| PATCH | `/articles/:id` | Author | Future |
| GET | `/articles/:id/related` | Public | Future |
| GET | `/articles/:id/reactions` | Public | Live feature |
| PUT | `/articles/:id/reactions` | User | Live feature |
| DELETE | `/articles/:id/reactions` | User | Future |
| GET | `/articles/:id/comments` | Public | Live feature |
| POST | `/articles/:id/comments` | User | Live feature |
| GET | `/profiles/me` | User | Live feature |
| GET | `/profiles/:id` | Public | Live feature |
| PATCH | `/profiles/me` | User | Future |
| GET | `/users/me/bookmarks` | User | Future |
| POST | `/articles/:id/bookmark` | User | Future |
| DELETE | `/articles/:id/bookmark` | User | Future |
| GET | `/schools` | Public | Planned |
| GET | `/schools/:id` | Public | Planned |
| GET | `/schools/:id/philosophers` | Public | Planned |
| GET | `/books` | Public | Planned |
| GET | `/books/:id` | Public | Planned |
| GET | `/users/me/books` | User | Planned |
| POST | `/users/me/books/:bookId` | User | Planned |
| DELETE | `/users/me/books/:bookId` | User | Planned |
| GET | `/timeline` | Public | Planned |
