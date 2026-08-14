import { Router } from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import * as booksController from "./books.controller.js";

export const booksRoutes = Router();

booksRoutes.get("/", booksController.list);
booksRoutes.get("/:id", booksController.getById);
booksRoutes.patch(
  "/:id/cover",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  booksController.updateCover,
);
