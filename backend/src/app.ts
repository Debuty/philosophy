import cors from "cors";
import express from "express";
import { sql } from "drizzle-orm";
import { env } from "./config/env.js";
import { db } from "./db/index.js";

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
