import type { Request } from "express";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export type AuthenticatedRequest = Request & { user: AuthUser };
