import type { NextFunction, Request, Response } from "express";
import {
  articleIdParamSchema,
  commentIdParamSchema,
  createArticleSchema,
  createCommentSchema,
  listArticlesQuerySchema,
  listBookmarksQuerySchema,
  relatedArticlesQuerySchema,
  setReactionSchema,
  updateArticleSchema,
  updateCommentSchema,
} from "./articles.schemas.js";
import * as articlesService from "./articles.service.js";
import * as bookmarksService from "./bookmarks.service.js";
import * as commentsService from "./comments.service.js";
import * as reactionsService from "./reactions.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listArticlesQuerySchema.parse(req.query);
    const result = await articlesService.listArticles(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const data = await articlesService.getArticleById(id, req.user?.id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const body = createArticleSchema.parse(req.body);
    const result = await articlesService.createArticle(req.user!.id, body);
    res.status(201).json({
      data: result,
      message: "Article created successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const body = updateArticleSchema.parse(req.body);
    const result = await articlesService.updateArticle(id, req.user!.id, body);
    res.status(200).json({
      data: result,
      message: "Article updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function related(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const query = relatedArticlesQuerySchema.parse(req.query);
    const data = await articlesService.getRelatedArticles(id, query.limit);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function getReactions(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const data = await reactionsService.getReactions(id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function putReaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const body = setReactionSchema.parse(req.body);
    const data = await reactionsService.upsertReaction(id, req.user!.id, body.reaction);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function deleteReaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const data = await reactionsService.deleteReaction(id, req.user!.id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function listComments(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const data = await commentsService.listComments(id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function listCommentReplies(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, commentId } = commentIdParamSchema.parse(req.params);
    const data = await commentsService.listCommentReplies(id, commentId);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const body = createCommentSchema.parse(req.body);
    const data = await commentsService.createComment(id, req.user!.id, body);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, commentId } = commentIdParamSchema.parse(req.params);
    const body = updateCommentSchema.parse(req.body);
    const data = await commentsService.updateComment(id, commentId, req.user!.id, body.content);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, commentId } = commentIdParamSchema.parse(req.params);
    await commentsService.deleteComment(id, commentId, req.user!.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function putCommentReaction(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, commentId } = commentIdParamSchema.parse(req.params);
    const body = setReactionSchema.parse(req.body);
    const data = await commentsService.upsertCommentReaction(
      id,
      commentId,
      req.user!.id,
      body.reaction,
    );
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function deleteCommentReaction(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id, commentId } = commentIdParamSchema.parse(req.params);
    const data = await commentsService.deleteCommentReaction(id, commentId, req.user!.id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

export async function addBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    const data = await bookmarksService.addBookmark(id, req.user!.id);
    res.status(201).json({ data, message: "Article bookmarked" });
  } catch (error) {
    next(error);
  }
}

export async function removeBookmark(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = articleIdParamSchema.parse(req.params);
    await bookmarksService.removeBookmark(id, req.user!.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function listMyBookmarks(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listBookmarksQuerySchema.parse(req.query);
    const result = await bookmarksService.listMyBookmarks(req.user!.id, query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
