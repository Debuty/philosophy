import { Router } from "express";
import { requireAdmin, requireAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import * as philosophersController from "./philosophers.controller.js";

export const philosophersRoutes = Router();

philosophersRoutes.get("/", philosophersController.list);
philosophersRoutes.patch(
  "/:id/image",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  philosophersController.updateImage,
);
philosophersRoutes.get("/:id/bio", philosophersController.bio);
