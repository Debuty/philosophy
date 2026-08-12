import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articleReactions } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import {
  assertArticleExists,
  getArticleReactionCounts,
} from "./articles.service.js";

type ArticleReactionValue = "like" | "dislike";

async function getMyReaction(
  articleId: string,
  userId: string,
): Promise<ArticleReactionValue | null> {
  const [row] = await db
    .select({ reaction: articleReactions.reaction })
    .from(articleReactions)
    .where(
      and(
        eq(articleReactions.articleId, articleId),
        eq(articleReactions.userId, userId),
      ),
    )
    .limit(1);

  return (row?.reaction as ArticleReactionValue | undefined) ?? null;
}

async function buildReactionsResponse(
  articleId: string,
  viewerId?: string,
  knownReaction?: ArticleReactionValue | null,
) {
  const counts = await getArticleReactionCounts(articleId);

  if (!viewerId) {
    return counts;
  }

  const my_reaction =
    knownReaction !== undefined
      ? knownReaction
      : await getMyReaction(articleId, viewerId);

  return {
    ...counts,
    my_reaction,
  };
}

export async function getReactions(articleId: string, viewerId?: string) {
  await assertArticleExists(articleId);
  return buildReactionsResponse(articleId, viewerId);
}

export async function upsertReaction(
  articleId: string,
  userId: string,
  reaction: ArticleReactionValue,
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

  return buildReactionsResponse(articleId, userId, reaction);
}

export async function deleteReaction(articleId: string, userId: string) {
  await assertArticleExists(articleId);

  const deleted = await db
    .delete(articleReactions)
    .where(
      and(
        eq(articleReactions.articleId, articleId),
        eq(articleReactions.userId, userId),
      ),
    )
    .returning({ articleId: articleReactions.articleId });

  if (deleted.length === 0) {
    throw new AppError(404, "NOT_FOUND", "Reaction not found");
  }

  return buildReactionsResponse(articleId, userId, null);
}
