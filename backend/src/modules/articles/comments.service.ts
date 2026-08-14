import { and, asc, desc, eq, inArray, isNotNull, isNull, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { commentReactions, comments, profiles } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import type { CreateCommentInput } from "./articles.schemas.js";
import { assertArticleExists } from "./articles.service.js";

type CommentReactionValue = "like" | "dislike";

async function getCommentReactionCounts(commentId: string) {
  const [row] = await db
    .select({
      likes: sql<number>`coalesce(sum(case when ${commentReactions.reaction} = 'like' then 1 else 0 end), 0)::int`,
      dislikes: sql<number>`coalesce(sum(case when ${commentReactions.reaction} = 'dislike' then 1 else 0 end), 0)::int`,
    })
    .from(commentReactions)
    .where(eq(commentReactions.commentId, commentId));

  return {
    likes: row?.likes ?? 0,
    dislikes: row?.dislikes ?? 0,
  };
}

async function getMyCommentReactions(
  viewerId: string,
  commentIds: string[],
): Promise<Map<string, CommentReactionValue>> {
  if (commentIds.length === 0) {
    return new Map();
  }

  const rows = await db
    .select({
      commentId: commentReactions.commentId,
      reaction: commentReactions.reaction,
    })
    .from(commentReactions)
    .where(
      and(
        eq(commentReactions.userId, viewerId),
        inArray(commentReactions.commentId, commentIds),
      ),
    );

  return new Map(
    rows.map((row) => [
      row.commentId,
      row.reaction as CommentReactionValue,
    ]),
  );
}

async function buildCommentReactionCounts(
  commentId: string,
  viewerId?: string,
  knownReaction?: CommentReactionValue | null,
) {
  const counts = await getCommentReactionCounts(commentId);

  if (!viewerId) {
    return counts;
  }

  const my_reaction =
    knownReaction !== undefined
      ? knownReaction
      : (
          await getMyCommentReactions(viewerId, [commentId])
        ).get(commentId) ?? null;

  return {
    ...counts,
    my_reaction,
  };
}

async function getCommentOrThrow(articleId: string, commentId: string) {
  const [row] = await db
    .select({
      id: comments.id,
      articleId: comments.articleId,
      userId: comments.userId,
      parentId: comments.parentId,
      content: comments.content,
      depth: comments.depth,
    })
    .from(comments)
    .where(and(eq(comments.id, commentId), eq(comments.articleId, articleId)))
    .limit(1);

  if (!row) {
    throw new AppError(404, "NOT_FOUND", "Comment not found");
  }

  return row;
}

const reactionCountsSubquery = () =>
  db
    .select({
      commentId: commentReactions.commentId,
      likes: sql<number>`coalesce(sum(case when ${commentReactions.reaction} = 'like' then 1 else 0 end), 0)::int`.as(
        "likes",
      ),
      dislikes: sql<number>`coalesce(sum(case when ${commentReactions.reaction} = 'dislike' then 1 else 0 end), 0)::int`.as(
        "dislikes",
      ),
    })
    .from(commentReactions)
    .groupBy(commentReactions.commentId)
    .as("comment_reaction_counts");

const repliesCountSubquery = () =>
  db
    .select({
      parentId: comments.parentId,
      repliesCount: sql<number>`count(*)::int`.as("replies_count"),
    })
    .from(comments)
    .where(isNotNull(comments.parentId))
    .groupBy(comments.parentId)
    .as("replies_counts");

type CommentListRow = {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  articleId: string;
  parentId: string | null;
  depth: number;
  username: string;
  avatarUrl: string | null;
  likes: number | null;
  dislikes: number | null;
  repliesCount: number | null;
};

function toCommentDto(
  row: CommentListRow,
  myReactions?: Map<string, CommentReactionValue> | null,
) {
  return {
    id: row.id,
    content: row.content,
    created_at: row.createdAt.toISOString(),
    user_id: row.userId,
    article_id: row.articleId,
    parent_id: row.parentId,
    depth: row.depth,
    replies_count: row.repliesCount ?? 0,
    profiles: {
      username: row.username,
      avatar_url: row.avatarUrl,
    },
    comment_reaction_counts: {
      likes: row.likes ?? 0,
      dislikes: row.dislikes ?? 0,
      ...(myReactions
        ? { my_reaction: myReactions.get(row.id) ?? null }
        : {}),
    },
  };
}

/** Root comments only (`parent_id` null), newest first, with direct `replies_count`. */
export async function listComments(articleId: string, viewerId?: string) {
  await assertArticleExists(articleId);

  const reactionCounts = reactionCountsSubquery();
  const repliesCounts = repliesCountSubquery();

  const rows = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      userId: comments.userId,
      articleId: comments.articleId,
      parentId: comments.parentId,
      depth: comments.depth,
      username: profiles.username,
      avatarUrl: profiles.avatarUrl,
      likes: reactionCounts.likes,
      dislikes: reactionCounts.dislikes,
      repliesCount: repliesCounts.repliesCount,
    })
    .from(comments)
    .innerJoin(profiles, eq(profiles.id, comments.userId))
    .leftJoin(reactionCounts, eq(reactionCounts.commentId, comments.id))
    .leftJoin(repliesCounts, eq(repliesCounts.parentId, comments.id))
    .where(and(eq(comments.articleId, articleId), isNull(comments.parentId)))
    .orderBy(desc(comments.createdAt));

  const myReactions = viewerId
    ? await getMyCommentReactions(
        viewerId,
        rows.map((row) => row.id),
      )
    : null;

  return rows.map((row) => toCommentDto(row, myReactions));
}

/** Direct children of a comment (`parent_id = commentId`), oldest first, with `replies_count`. */
export async function listCommentReplies(
  articleId: string,
  commentId: string,
  viewerId?: string,
) {
  await getCommentOrThrow(articleId, commentId);

  const reactionCounts = reactionCountsSubquery();
  const repliesCounts = repliesCountSubquery();

  const rows = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      userId: comments.userId,
      articleId: comments.articleId,
      parentId: comments.parentId,
      depth: comments.depth,
      username: profiles.username,
      avatarUrl: profiles.avatarUrl,
      likes: reactionCounts.likes,
      dislikes: reactionCounts.dislikes,
      repliesCount: repliesCounts.repliesCount,
    })
    .from(comments)
    .innerJoin(profiles, eq(profiles.id, comments.userId))
    .leftJoin(reactionCounts, eq(reactionCounts.commentId, comments.id))
    .leftJoin(repliesCounts, eq(repliesCounts.parentId, comments.id))
    .where(
      and(eq(comments.articleId, articleId), eq(comments.parentId, commentId)),
    )
    .orderBy(asc(comments.createdAt));

  const myReactions = viewerId
    ? await getMyCommentReactions(
        viewerId,
        rows.map((row) => row.id),
      )
    : null;

  return rows.map((row) => toCommentDto(row, myReactions));
}

export async function createComment(
  articleId: string,
  userId: string,
  input: CreateCommentInput,
) {
  await assertArticleExists(articleId);

  let depth = 0;
  let parentId: string | null = null;

  if (input.parentId) {
    const parent = await getCommentOrThrow(articleId, input.parentId);
    depth = parent.depth + 1;
    if (depth > 5) {
      throw new AppError(400, "VALIDATION_ERROR", "Maximum comment depth is 5");
    }
    parentId = parent.id;
  }

  const [created] = await db
    .insert(comments)
    .values({
      articleId,
      userId,
      parentId,
      content: input.content,
      depth,
    })
    .returning({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      userId: comments.userId,
      articleId: comments.articleId,
      parentId: comments.parentId,
      depth: comments.depth,
    });

  if (!created) {
    throw new AppError(500, "INTERNAL_ERROR", "Failed to create comment");
  }

  const [profile] = await db
    .select({
      username: profiles.username,
      avatarUrl: profiles.avatarUrl,
    })
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  return {
    id: created.id,
    content: created.content,
    created_at: created.createdAt.toISOString(),
    user_id: created.userId,
    article_id: created.articleId,
    parent_id: created.parentId,
    depth: created.depth,
    profiles: {
      username: profile?.username ?? null,
      avatar_url: profile?.avatarUrl ?? null,
    },
    replies_count: 0,
    comment_reaction_counts: {
      likes: 0,
      dislikes: 0,
      my_reaction: null,
    },
  };
}

export async function updateComment(
  articleId: string,
  commentId: string,
  userId: string,
  content: string,
) {
  const existing = await getCommentOrThrow(articleId, commentId);
  if (existing.userId !== userId) {
    throw new AppError(
      403,
      "FORBIDDEN",
      "Only the comment author can edit this comment",
    );
  }

  const [updated] = await db
    .update(comments)
    .set({ content, updatedAt: new Date() })
    .where(eq(comments.id, commentId))
    .returning({
      id: comments.id,
      content: comments.content,
      updatedAt: comments.updatedAt,
    });

  return {
    id: updated!.id,
    content: updated!.content,
    updated_at: updated!.updatedAt.toISOString(),
  };
}

export async function deleteComment(
  articleId: string,
  commentId: string,
  userId: string,
) {
  const article = await assertArticleExists(articleId);
  const existing = await getCommentOrThrow(articleId, commentId);

  if (existing.userId !== userId && article.authorId !== userId) {
    throw new AppError(
      403,
      "FORBIDDEN",
      "Only the comment author or article author can delete this comment",
    );
  }

  await db.delete(comments).where(eq(comments.id, commentId));
}

export async function upsertCommentReaction(
  articleId: string,
  commentId: string,
  userId: string,
  reaction: CommentReactionValue,
) {
  await getCommentOrThrow(articleId, commentId);

  await db
    .insert(commentReactions)
    .values({
      commentId,
      userId,
      reaction,
    })
    .onConflictDoUpdate({
      target: [commentReactions.commentId, commentReactions.userId],
      set: {
        reaction,
        updatedAt: new Date(),
      },
    });

  return buildCommentReactionCounts(commentId, userId, reaction);
}

export async function deleteCommentReaction(
  articleId: string,
  commentId: string,
  userId: string,
) {
  await getCommentOrThrow(articleId, commentId);

  const deleted = await db
    .delete(commentReactions)
    .where(
      and(
        eq(commentReactions.commentId, commentId),
        eq(commentReactions.userId, userId),
      ),
    )
    .returning({ commentId: commentReactions.commentId });

  if (deleted.length === 0) {
    throw new AppError(404, "NOT_FOUND", "Reaction not found");
  }

  return buildCommentReactionCounts(commentId, userId, null);
}
