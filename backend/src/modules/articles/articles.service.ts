import { and, count, desc, eq, ne, sql, type SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articles, articleReactions, profiles } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import type {
  CreateArticleInput,
  ListArticlesQuery,
  UpdateArticleInput,
} from "./articles.schemas.js";

async function getArticleReactionCounts(articleId: string) {
  const [row] = await db
    .select({
      likes: sql<number>`coalesce(sum(case when ${articleReactions.reaction} = 'like' then 1 else 0 end), 0)::int`,
      dislikes: sql<number>`coalesce(sum(case when ${articleReactions.reaction} = 'dislike' then 1 else 0 end), 0)::int`,
    })
    .from(articleReactions)
    .where(eq(articleReactions.articleId, articleId));

  return {
    likes: row?.likes ?? 0,
    dislikes: row?.dislikes ?? 0,
  };
}

function buildListFilters(query: ListArticlesQuery): SQL {
  const parts: SQL[] = [eq(articles.state, "published")];

  if (query.category) {
    parts.push(eq(articles.category, query.category));
  }
  if (query.authorId) {
    parts.push(eq(articles.authorId, query.authorId));
  }

  return and(...parts)!;
}

export async function listArticles(query: ListArticlesQuery) {
  const where = buildListFilters(query);
  const offset = (query.page - 1) * query.pageSize;

  const reactionCounts = db
    .select({
      articleId: articleReactions.articleId,
      likes: sql<number>`coalesce(sum(case when ${articleReactions.reaction} = 'like' then 1 else 0 end), 0)::int`.as(
        "likes",
      ),
      dislikes: sql<number>`coalesce(sum(case when ${articleReactions.reaction} = 'dislike' then 1 else 0 end), 0)::int`.as(
        "dislikes",
      ),
    })
    .from(articleReactions)
    .groupBy(articleReactions.articleId)
    .as("reaction_counts");

  const [rows, totalRow] = await Promise.all([
    db
      .select({
        id: articles.id,
        title: articles.title,
        subtitle: articles.subtitle,
        content: articles.content,
        category: articles.category,
        state: articles.state,
        authorId: articles.authorId,
        createdAt: articles.createdAt,
        username: profiles.username,
        bio: profiles.bio,
        avatarUrl: profiles.avatarUrl,
        likes: reactionCounts.likes,
        dislikes: reactionCounts.dislikes,
      })
      .from(articles)
      .innerJoin(profiles, eq(profiles.id, articles.authorId))
      .leftJoin(reactionCounts, eq(reactionCounts.articleId, articles.id))
      .where(where)
      .orderBy(desc(articles.createdAt))
      .limit(query.pageSize)
      .offset(offset),
    db
      .select({ total: count() })
      .from(articles)
      .where(where)
      .then((result) => result[0]),
  ]);

  const total = totalRow?.total ?? 0;

  return {
    data: rows.map((row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      content: row.content,
      category: row.category,
      state: row.state,
      author_id: row.authorId,
      created_at: row.createdAt.toISOString(),
      profiles: {
        username: row.username,
        bio: row.bio,
        avatar_url: row.avatarUrl,
      },
      article_reaction_counts: {
        likes: row.likes ?? 0,
        dislikes: row.dislikes ?? 0,
      },
    })),
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
      total,
      totalPages: Math.ceil(total / query.pageSize) || 0,
    },
  };
}

export async function getArticleById(id: string, viewerId?: string) {
  const [row] = await db
    .select({
      id: articles.id,
      title: articles.title,
      subtitle: articles.subtitle,
      content: articles.content,
      category: articles.category,
      state: articles.state,
      authorId: articles.authorId,
      createdAt: articles.createdAt,
      updatedAt: articles.updatedAt,
      username: profiles.username,
      bio: profiles.bio,
      avatarUrl: profiles.avatarUrl,
    })
    .from(articles)
    .innerJoin(profiles, eq(profiles.id, articles.authorId))
    .where(eq(articles.id, id))
    .limit(1);

  if (!row) {
    throw new AppError(404, "NOT_FOUND", "Article not found");
  }

  if (row.state === "draft" && row.authorId !== viewerId) {
    throw new AppError(404, "NOT_FOUND", "Article not found");
  }

  const reactionCounts = await getArticleReactionCounts(id);

  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    content: row.content,
    category: row.category,
    state: row.state,
    author_id: row.authorId,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
    profiles: {
      username: row.username,
      bio: row.bio,
      avatar_url: row.avatarUrl,
    },
    article_reaction_counts: reactionCounts,
  };
}

export async function createArticle(authorId: string, input: CreateArticleInput) {
  const [created] = await db
    .insert(articles)
    .values({
      title: input.title,
      subtitle: input.subtitle,
      content: input.content,
      category: input.category,
      state: input.state,
      authorId,
    })
    .returning({ id: articles.id });

  if (!created) {
    throw new AppError(500, "INTERNAL_ERROR", "Failed to create article");
  }

  return { id: created.id };
}

export async function updateArticle(
  id: string,
  authorId: string,
  input: UpdateArticleInput,
) {
  const [existing] = await db
    .select({ id: articles.id, authorId: articles.authorId })
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1);

  if (!existing) {
    throw new AppError(404, "NOT_FOUND", "Article not found");
  }
  if (existing.authorId !== authorId) {
    throw new AppError(403, "FORBIDDEN", "Only the author can update this article");
  }

  const [updated] = await db
    .update(articles)
    .set({
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.subtitle !== undefined ? { subtitle: input.subtitle } : {}),
      ...(input.content !== undefined ? { content: input.content } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.state !== undefined ? { state: input.state } : {}),
      updatedAt: new Date(),
    })
    .where(eq(articles.id, id))
    .returning({ id: articles.id });

  return { id: updated!.id };
}

export async function getRelatedArticles(id: string, limit: number) {
  const [current] = await db
    .select({ id: articles.id, category: articles.category, state: articles.state })
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1);

  if (!current || current.state !== "published") {
    throw new AppError(404, "NOT_FOUND", "Article not found");
  }

  const rows = await db
    .select({
      id: articles.id,
      title: articles.title,
      subtitle: articles.subtitle,
      category: articles.category,
      createdAt: articles.createdAt,
    })
    .from(articles)
    .where(
      and(
        eq(articles.state, "published"),
        eq(articles.category, current.category),
        ne(articles.id, id),
      ),
    )
    .orderBy(desc(articles.createdAt))
    .limit(limit);

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    created_at: row.createdAt.toISOString(),
  }));
}

export { getArticleReactionCounts };

export async function assertArticleExists(articleId: string) {
  const [row] = await db
    .select({ id: articles.id, authorId: articles.authorId, state: articles.state })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (!row) {
    throw new AppError(404, "NOT_FOUND", "Article not found");
  }

  return row;
}
