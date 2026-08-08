import type { NextFunction, Request, Response } from "express";
import { loginSchema, signupSchema } from "./auth.schemas.js";
import * as authService from "./auth.service.js";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const body = signupSchema.parse(req.body);
    const result = await authService.signup(body);
    res.status(201).json({
      data: result,
      message: "Account created successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const body = loginSchema.parse(req.body);
    const result = await authService.login(body);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function logout(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export async function session(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authService.getSession(req.user!.id);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}
