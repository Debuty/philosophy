import type { NextFunction, Request, Response } from "express";
import { AppError } from "../lib/errors.js";
import { verifyAccessToken } from "../lib/jwt.js";

export async function requireAuth(req: Request, _res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new AppError(401, "UNAUTHORIZED", "Missing or invalid Authorization header");
    }

    const token = header.slice("Bearer ".length).trim();
    if (!token) {
      throw new AppError(401, "UNAUTHORIZED", "Missing or invalid Authorization header");
    }

    const payload = await verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    next(new AppError(401, "UNAUTHORIZED", "Invalid or expired token"));
  }
}
