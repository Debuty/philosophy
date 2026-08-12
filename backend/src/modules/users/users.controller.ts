import type { NextFunction, Request, Response } from "express";
import { userIdParamSchema } from "./users.schemas.js";
import * as usersService from "./users.service.js";

export async function getPublicProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = userIdParamSchema.parse(req.params);
    const data = await usersService.getPublicProfile(id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}
