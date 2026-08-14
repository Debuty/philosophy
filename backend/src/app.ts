import cors from "cors";
import express from "express";
import { sql } from "drizzle-orm";
import { env } from "./config/env.js";
import { db } from "./db/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import {
  articlesRoutes,
  bookmarksRoutes,
} from "./modules/articles/articles.routes.js";
import { philosophersRoutes } from "./modules/philosophers/philosophers.routes.js";
import { booksRoutes } from "./modules/books/books.routes.js";
import { usersRoutes } from "./modules/users/users.routes.js";

export const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({ ok: true, db: true });
  } catch (error) {
    console.error("Health check DB error:", error);
    res.status(503).json({ ok: false, db: false });
  }
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/philosophers", philosophersRoutes);
app.use("/api/v1/books", booksRoutes);
app.use("/api/v1/articles", articlesRoutes);
app.use("/api/v1/users/me/bookmarks", bookmarksRoutes);
app.use("/api/v1/users", usersRoutes);
app.use(errorHandler);
