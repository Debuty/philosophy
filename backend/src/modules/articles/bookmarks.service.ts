import { and, count, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { articleBookmarks, articles, profiles } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import type { ListBookmarksQuery } from "./articles.schemas.js";
import { assertArticleExists } from "./articles.service.js";

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}

export async function addBookmark(articleId: string, userId: string) {
  const article = await assertArticleExists(articleId);
  if (article.state !== "published") {
    throw new AppError(404, "NOT_FOUND", "Article not found");
  }

  try {
    await db.insert(articleBookmarks).values({
      userId,
      articleId,
    });
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new AppError(409, "CONFLICT", "Article already bookmarked");
    }
    throw error;
  }

  return { article_id: articleId };
}

export async function removeBookmark(articleId: string, userId: string) {
  await assertArticleExists(articleId);

  const deleted = await db
    .delete(articleBookmarks)
    .where(
      and(eq(articleBookmarks.articleId, articleId), eq(articleBookmarks.userId, userId)),
    )
    .returning({ articleId: articleBookmarks.articleId });

  if (deleted.length === 0) {
    throw new AppError(404, "NOT_FOUND", "Bookmark not found");
  }
}

export async function listMyBookmarks(userId: string, query: ListBookmarksQuery) {
  const offset = (query.page - 1) * query.pageSize;

  const [rows, totalRow] = await Promise.all([
    db
      .select({
        id: articles.id,
        title: articles.title,
        subtitle: articles.subtitle,
        category: articles.category,
        createdAt: articles.createdAt,
        bookmarkedAt: articleBookmarks.createdAt,
        username: profiles.username,
      })
      .from(articleBookmarks)
      .innerJoin(articles, eq(articles.id, articleBookmarks.articleId))
      .innerJoin(profiles, eq(profiles.id, articles.authorId))
      .where(eq(articleBookmarks.userId, userId))
      .orderBy(desc(articleBookmarks.createdAt))
      .limit(query.pageSize)
      .offset(offset),
    db
      .select({ total: count() })
      .from(articleBookmarks)
      .where(eq(articleBookmarks.userId, userId))
      .then((result) => result[0]),
  ]);

  const total = totalRow?.total ?? 0;

  return {
    data: rows.map((row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      category: row.category,
      created_at: row.createdAt.toISOString(),
      bookmarked_at: row.bookmarkedAt.toISOString(),
      profiles: {
        username: row.username,
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
