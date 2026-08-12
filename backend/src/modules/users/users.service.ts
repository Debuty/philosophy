import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { profiles } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";

export async function getPublicProfile(id: string) {
  const [row] = await db
    .select({
      id: profiles.id,
      username: profiles.username,
      bio: profiles.bio,
      avatarUrl: profiles.avatarUrl,
    })
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);

  if (!row) {
    throw new AppError(404, "NOT_FOUND", "Profile not found");
  }

  return {
    id: row.id,
    username: row.username,
    bio: row.bio,
    avatar_url: row.avatarUrl,
  };
}
