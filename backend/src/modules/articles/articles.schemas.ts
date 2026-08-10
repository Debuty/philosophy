import { z } from "zod";

export const ARTICLE_CATEGORIES = [
  "Philosophy of Mind",
  "Ethics",
  "Metaphysics",
  "Epistemology",
  "Logic",
  "Aesthetics",
  "Political Philosophy",
  "Philosophy of Science",
  "Philosophy of Religion",
] as const;

export const articleCategorySchema = z.enum(ARTICLE_CATEGORIES);
export const articleStateSchema = z.enum(["draft", "published"]);
export const reactionSchema = z.enum(["like", "dislike"]);

export const listArticlesQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  category: articleCategorySchema.optional(),
  authorId: z.uuid().optional(),
});

export const articleIdParamSchema = z.object({
  id: z.uuid(),
});

export const relatedArticlesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(20).default(3),
});

export const createArticleSchema = z.object({
  title: z.string().trim().min(1).max(300),
  subtitle: z.string().trim().min(1).max(500),
  content: z.string().trim().min(1),
  category: articleCategorySchema,
  state: articleStateSchema,
});

export const updateArticleSchema = z
  .object({
    title: z.string().trim().min(1).max(300).optional(),
    subtitle: z.string().trim().min(1).max(500).optional(),
    content: z.string().trim().min(1).optional(),
    category: articleCategorySchema.optional(),
    state: articleStateSchema.optional(),
  })
  .refine((body) => Object.keys(body).length > 0, {
    message: "At least one field is required",
  });

export const setReactionSchema = z.object({
  reaction: reactionSchema,
});

export const createCommentSchema = z.object({
  content: z.string().trim().min(1),
  parentId: z.uuid().optional(),
});

export const updateCommentSchema = z.object({
  content: z.string().trim().min(1),
});

export const commentIdParamSchema = z.object({
  id: z.uuid(),
  commentId: z.uuid(),
});

export const listBookmarksQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type ListArticlesQuery = z.infer<typeof listArticlesQuerySchema>;
export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type ListBookmarksQuery = z.infer<typeof listBookmarksQuerySchema>;
