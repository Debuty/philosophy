/**
 * Central query-key factory.
 * Always use these helpers in hooks — never hard-code string arrays.
 *
 * Pattern for a new feature:
 * 1. Add keys here (e.g. articles.list(filters))
 * 2. Create plain api fn in modules/<feature>/api/
 * 3. Wrap with useQuery / useMutation; invalidate related keys on success
 */
export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    session: () => [...queryKeys.auth.all, "session"] as const,
  },
  philosophers: {
    all: ["philosophers"] as const,
    list: (filters: unknown) =>
      [...queryKeys.philosophers.all, "list", filters] as const,
    featured: (limit: number) =>
      [...queryKeys.philosophers.all, "featured", limit] as const,
    bio: (id: number) => [...queryKeys.philosophers.all, "bio", id] as const,
  },
  articles: {
    all: ["articles"] as const,
    list: (filters: unknown) =>
      [...queryKeys.articles.all, "list", filters] as const,
    detail: (id: string) => [...queryKeys.articles.all, "detail", id] as const,
    reactions: (id: string) =>
      [...queryKeys.articles.all, "reactions", id] as const,
    comments: (id: string) =>
      [...queryKeys.articles.all, "comments", id] as const,
    // Separate prefix from `comments` so invalidating roots never refetches replies.
    commentReplies: (articleId: string, commentId: string) =>
      [...queryKeys.articles.all, "comment-replies", articleId, commentId] as const,
    related: (id: string, limit: number) =>
      [...queryKeys.articles.all, "related", id, limit] as const,
    bookmarks: (filters: unknown) =>
      [...queryKeys.articles.all, "bookmarks", filters] as const,
  },
  users: {
    all: ["users"] as const,
    profile: (id: string) => [...queryKeys.users.all, "profile", id] as const,
  },
  books: {
    all: ["books"] as const,
    list: (filters: unknown) =>
      [...queryKeys.books.all, "list", filters] as const,
    detail: (id: number) => [...queryKeys.books.all, "detail", id] as const,
  },
} as const;
