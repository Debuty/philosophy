import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { profiles, users } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import { signAccessToken } from "../../lib/jwt.js";
import { comparePassword, hashPassword } from "../../lib/password.js";
import type { LoginInput, SignupInput } from "./auth.schemas.js";

export type AuthUserDto = {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
  role: string;
};

function toUserDto(row: {
  id: string;
  email: string;
  role: string;
  username: string;
  avatarUrl: string | null;
}): AuthUserDto {
  return {
    id: row.id,
    email: row.email,
    username: row.username,
    avatarUrl: row.avatarUrl,
    role: row.role,
  };
}

/** Drizzle wraps pg errors as DrizzleQueryError; the Postgres code lives on `.cause`. */
function unwrapDbError(error: unknown): unknown {
  let current: unknown = error;
  for (let i = 0; i < 3; i++) {
    if (
      typeof current === "object" &&
      current !== null &&
      "code" in current &&
      (current as { code?: string }).code === "23505"
    ) {
      return current;
    }
    if (
      typeof current === "object" &&
      current !== null &&
      "cause" in current &&
      (current as { cause?: unknown }).cause != null
    ) {
      current = (current as { cause: unknown }).cause;
      continue;
    }
    break;
  }
  return error;
}

function isUniqueViolation(error: unknown): boolean {
  const dbError = unwrapDbError(error);
  return (
    typeof dbError === "object" &&
    dbError !== null &&
    "code" in dbError &&
    (dbError as { code?: string }).code === "23505"
  );
}

function uniqueViolationTarget(error: unknown): "email" | "username" | "unknown" {
  if (!isUniqueViolation(error)) return "unknown";

  const dbError = unwrapDbError(error);
  const constraint =
    typeof dbError === "object" && dbError !== null && "constraint" in dbError
      ? String((dbError as { constraint?: string }).constraint ?? "").toLowerCase()
      : "";

  if (constraint.includes("username")) return "username";
  if (constraint.includes("email")) return "email";
  return "unknown";
}

export async function signup(input: SignupInput) {
  const passwordHash = await hashPassword(input.password);
  const email = input.email.toLowerCase();

  let userId: string;

  try {
    userId = await db.transaction(async (tx) => {
      const [created] = await tx
        .insert(users)
        .values({
          email,
          passwordHash,
          emailConfirmed: false,
          phone: input.phone ?? null,
          role: "user",
        })
        .returning({ id: users.id });

      if (!created) {
        throw new AppError(500, "INTERNAL_ERROR", "Failed to create user");
      }

      await tx
        .insert(profiles)
        .values({
          id: created.id,
          username: input.username,
        })
        .onConflictDoUpdate({
          target: profiles.id,
          set: { username: input.username, updatedAt: new Date() },
        });

      return created.id;
    });
  } catch (error) {
    if (error instanceof AppError) throw error;

    if (isUniqueViolation(error)) {
      const target = uniqueViolationTarget(error);
      throw new AppError(
        409,
        "CONFLICT",
        target === "username" ? "Username already exists" : "Email already exists",
      );
    }

    throw error;
  }

  const user = toUserDto({
    id: userId,
    email,
    role: "user",
    username: input.username,
    avatarUrl: null,
  });
  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return { user, accessToken };
}

export async function login(input: LoginInput) {
  const [row] = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      passwordHash: users.passwordHash,
      username: profiles.username,
      avatarUrl: profiles.avatarUrl,
    })
    .from(users)
    .innerJoin(profiles, eq(profiles.id, users.id))
    .where(eq(users.email, input.email.toLowerCase()))
    .limit(1);

  if (!row) {
    throw new AppError(401, "UNAUTHORIZED", "Invalid credentials");
  }

  const valid = await comparePassword(input.password, row.passwordHash);
  if (!valid) {
    throw new AppError(401, "UNAUTHORIZED", "Invalid credentials");
  }

  const user = toUserDto(row);
  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  return { user, accessToken };
}

export async function getSession(userId: string) {
  const [row] = await db
    .select({
      id: users.id,
      email: users.email,
      role: users.role,
      username: profiles.username,
      avatarUrl: profiles.avatarUrl,
    })
    .from(users)
    .innerJoin(profiles, eq(profiles.id, users.id))
    .where(eq(users.id, userId))
    .limit(1);

  if (!row) {
    throw new AppError(401, "UNAUTHORIZED", "User not found");
  }

  return { user: toUserDto(row) };
}
