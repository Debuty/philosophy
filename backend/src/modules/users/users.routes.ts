import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import * as usersController from "./users.controller.js";

export const usersRoutes = Router();

usersRoutes.patch(
  "/me/avatar",
  requireAuth,
  upload.single("image"),
  usersController.updateMyAvatar,
);

usersRoutes.get("/:id/profile", usersController.getPublicProfile);
