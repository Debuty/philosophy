import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { profiles } from "../../db/schema/index.js";
import { AppError } from "../../lib/errors.js";
import {
  CLOUDINARY_FOLDERS,
  requireUploadedImage,
  uploadImageBuffer,
} from "../../lib/cloudinaryUpload.js";

export async function getPublicProfile(id: string) {
  const [row] = await db
    .select({
      id: profiles.id,
      username: profiles.username,
      bio: profiles.bio,
      avatarUrl: profiles.avatarUrl,
    })
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);

  if (!row) {
    throw new AppError(404, "NOT_FOUND", "Profile not found");
  }

  return {
    id: row.id,
    username: row.username,
    bio: row.bio,
    avatar_url: row.avatarUrl,
  };
}

export async function updateMyAvatar(
  userId: string,
  file: Express.Multer.File | undefined,
) {
  const image = requireUploadedImage(file);

  const [profile] = await db
    .select({ id: profiles.id })
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);

  if (!profile) {
    throw new AppError(404, "NOT_FOUND", "Profile not found");
  }

  const uploaded = await uploadImageBuffer({
    buffer: image.buffer,
    folder: CLOUDINARY_FOLDERS.avatars,
    publicId: userId,
  });

  const [updated] = await db
    .update(profiles)
    .set({
      avatarUrl: uploaded.url,
      updatedAt: new Date(),
    })
    .where(eq(profiles.id, userId))
    .returning({
      id: profiles.id,
      avatarUrl: profiles.avatarUrl,
    });

  return {
    id: updated.id,
    avatar_url: updated.avatarUrl,
  };
}
