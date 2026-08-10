import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articleReactions } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import { assertArticleExists, getArticleReactionCounts } from "./articles.service.js";

export async function getReactions(articleId: string) {
  await assertArticleExists(articleId);
  return getArticleReactionCounts(articleId);
}

export async function upsertReaction(
  articleId: string,
  userId: string,
  reaction: "like" | "dislike",
) {
  await assertArticleExists(articleId);

  await db
    .insert(articleReactions)
    .values({
      articleId,
      userId,
      reaction,
    })
    .onConflictDoUpdate({
      target: [articleReactions.articleId, articleReactions.userId],
      set: {
        reaction,
        updatedAt: new Date(),
      },
    });

  return getArticleReactionCounts(articleId);
}

export async function deleteReaction(articleId: string, userId: string) {
  await assertArticleExists(articleId);

  const deleted = await db
    .delete(articleReactions)
    .where(
      and(eq(articleReactions.articleId, articleId), eq(articleReactions.userId, userId)),
    )
    .returning({ articleId: articleReactions.articleId });

  if (deleted.length === 0) {
    throw new AppError(404, "NOT_FOUND", "Reaction not found");
  }

  return getArticleReactionCounts(articleId);
}
