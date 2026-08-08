import { z } from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  username: z.string().min(1).max(50),
  phone: z.string().max(20).optional(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
