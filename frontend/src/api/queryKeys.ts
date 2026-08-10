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
  // Future modules (examples — wire when migrating off Supabase):
  // philosophers: {
  //   all: ["philosophers"] as const,
  //   list: (filters: unknown) => [...queryKeys.philosophers.all, "list", filters] as const,
  //   bio: (id: number) => [...queryKeys.philosophers.all, "bio", id] as const,
  // },
  // articles: {
  //   all: ["articles"] as const,
  //   list: (filters: unknown) => [...queryKeys.articles.all, "list", filters] as const,
  //   detail: (id: string) => [...queryKeys.articles.all, "detail", id] as const,
  // },
} as const;
