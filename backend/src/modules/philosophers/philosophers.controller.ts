import type { NextFunction, Request, Response } from "express";
import {
  listPhilosophersQuerySchema,
  philosopherIdParamSchema,
} from "./philosophers.schemas.js";
import * as philosophersService from "./philosophers.service.js";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const query = listPhilosophersQuerySchema.parse(req.query);
    const result = await philosophersService.listPhilosophers(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function bio(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = philosopherIdParamSchema.parse(req.params);
    const data = await philosophersService.getPhilosopherBio(id);
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}
