import { Router } from "express";
import * as philosophersController from "./philosophers.controller.js";

export const philosophersRoutes = Router();

philosophersRoutes.get("/", philosophersController.list);
philosophersRoutes.get("/:id/bio", philosophersController.bio);
