import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import * as authController from "./auth.controller.js";

export const authRoutes = Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", requireAuth, authController.logout);
authRoutes.get("/session", requireAuth, authController.session);
