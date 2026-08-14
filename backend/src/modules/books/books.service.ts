import { and, count, eq, ilike, or, type SQL } from "drizzle-orm";
import { db } from "../../db/index.js";
import { books } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import {
  CLOUDINARY_FOLDERS,
  requireUploadedImage,
  uploadImageBuffer,
} from "../../lib/cloudinaryUpload.js";
import type { ListBooksQuery } from "./books.schemas.js";

export type BookListItemDto = {
  id: number;
  title_en: string;
  title_ar: string;
  author_en: string | null;
  author_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  cover_image_url: string | null;
  published_year: number | null;
};

export type BookDetailDto = BookListItemDto;

function toBookDto(row: {
  id: number;
  titleEn: string;
  titleAr: string;
  authorEn: string | null;
  authorAr: string | null;
  descriptionEn: string | null;
  descriptionAr: string | null;
  coverImageUrl: string | null;
  publishedYear: number | null;
}): BookDetailDto {
  return {
    id: row.id,
    title_en: row.titleEn,
    title_ar: row.titleAr,
    author_en: row.authorEn,
    author_ar: row.authorAr,
    description_en: row.descriptionEn,
    description_ar: row.descriptionAr,
    cover_image_url: row.coverImageUrl,
    published_year: row.publishedYear,
  };
}

const bookSelect = {
  id: books.id,
  titleEn: books.titleEn,
  titleAr: books.titleAr,
  authorEn: books.authorEn,
  authorAr: books.authorAr,
  descriptionEn: books.descriptionEn,
  descriptionAr: books.descriptionAr,
  coverImageUrl: books.coverImageUrl,
  publishedYear: books.publishedYear,
};

function buildFilters(query: ListBooksQuery): SQL | undefined {
  const parts: SQL[] = [];

  if (query.bookName) {
    const term = `%${query.bookName}%`;
    parts.push(
      or(ilike(books.titleEn, term), ilike(books.titleAr, term))!,
    );
  }

  if (query.author) {
    const term = `%${query.author}%`;
    parts.push(
      or(ilike(books.authorEn, term), ilike(books.authorAr, term))!,
    );
  }

  if (parts.length === 0) return undefined;
  if (parts.length === 1) return parts[0];
  return and(...parts);
}

export async function listBooks(query: ListBooksQuery) {
  const where = buildFilters(query);
  const offset = (query.page - 1) * query.pageSize;

  const [rows, totalRow] = await Promise.all([
    db
      .select(bookSelect)
      .from(books)
      .where(where)
      .orderBy(books.id)
      .limit(query.pageSize)
      .offset(offset),
    db
      .select({ total: count() })
      .from(books)
      .where(where)
      .then((result) => result[0]),
  ]);

  const total = totalRow?.total ?? 0;

  return {
    data: rows.map(toBookDto),
    pagination: {
      page: query.page,
      pageSize: query.pageSize,
      total,
      totalPages: Math.ceil(total / query.pageSize) || 0,
    },
  };
}

export async function getBookById(bookId: number): Promise<BookDetailDto> {
  const [row] = await db
    .select(bookSelect)
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);

  if (!row) {
    throw new AppError(404, "NOT_FOUND", "Book not found");
  }

  return toBookDto(row);
}

export async function updateBookCover(
  bookId: number,
  file: Express.Multer.File | undefined,
) {
  const image = requireUploadedImage(file);

  const [book] = await db
    .select({ id: books.id })
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);

  if (!book) {
    throw new AppError(404, "NOT_FOUND", "Book not found");
  }

  const uploaded = await uploadImageBuffer({
    buffer: image.buffer,
    folder: CLOUDINARY_FOLDERS.books,
    publicId: String(bookId),
  });

  const [updated] = await db
    .update(books)
    .set({ coverImageUrl: uploaded.url })
    .where(eq(books.id, bookId))
    .returning({
      id: books.id,
      coverImageUrl: books.coverImageUrl,
    });

  return {
    id: updated.id,
    cover_image_url: updated.coverImageUrl,
  };
}
