import { Router } from "express";
import { optionalAuth, requireAuth } from "../../middleware/auth.js";
import * as articlesController from "./articles.controller.js";

export const articlesRoutes = Router();

articlesRoutes.get("/", optionalAuth, articlesController.list);
articlesRoutes.post("/", requireAuth, articlesController.create);

articlesRoutes.get("/:id/related", articlesController.related);

articlesRoutes.get(
  "/:id/reactions",
  optionalAuth,
  articlesController.getReactions,
);
articlesRoutes.put(
  "/:id/reactions",
  requireAuth,
  articlesController.putReaction,
);
articlesRoutes.delete(
  "/:id/reactions",
  requireAuth,
  articlesController.deleteReaction,
);

articlesRoutes.get("/:id/comments", articlesController.listComments);
articlesRoutes.get(
  "/:id/comments/:commentId/replies",
  articlesController.listCommentReplies,
);
articlesRoutes.post(
  "/:id/comments",
  requireAuth,
  articlesController.createComment,
);
articlesRoutes.patch(
  "/:id/comments/:commentId",
  requireAuth,
  articlesController.updateComment,
);
articlesRoutes.delete(
  "/:id/comments/:commentId",
  requireAuth,
  articlesController.deleteComment,
);
articlesRoutes.put(
  "/:id/comments/:commentId/reactions",
  requireAuth,
  articlesController.putCommentReaction,
);
articlesRoutes.delete(
  "/:id/comments/:commentId/reactions",
  requireAuth,
  articlesController.deleteCommentReaction,
);

articlesRoutes.post(
  "/:id/bookmark",
  requireAuth,
  articlesController.addBookmark,
);
articlesRoutes.delete(
  "/:id/bookmark",
  requireAuth,
  articlesController.removeBookmark,
);

articlesRoutes.get("/:id", optionalAuth, articlesController.getById);
articlesRoutes.patch("/:id", requireAuth, articlesController.update);

export const bookmarksRoutes = Router();
bookmarksRoutes.get("/", requireAuth, articlesController.listMyBookmarks);
