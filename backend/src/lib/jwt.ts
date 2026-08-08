import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env.js";

export type AccessTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

const secretKey = () => new TextEncoder().encode(env.JWT_SECRET);

export async function signAccessToken(payload: AccessTokenPayload): Promise<string> {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  const { payload } = await jwtVerify(token, secretKey());

  if (!payload.sub || typeof payload.email !== "string" || typeof payload.role !== "string") {
    throw new Error("Invalid token payload");
  }

  return {
    sub: payload.sub,
    email: payload.email,
    role: payload.role,
  };
}
