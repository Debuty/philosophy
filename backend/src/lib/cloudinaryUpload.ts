import { cloudinary } from "../config/cloudinary.js";
import { AppError } from "./errors.js";

export const CLOUDINARY_FOLDERS = {
  avatars: "philosophy/avatars",
  books: "philosophy/books",
  philosophers: "philosophy/philosophers",
} as const;

export type UploadImageResult = {
  url: string;
  publicId: string;
};

type UploadImageOptions = {
  buffer: Buffer;
  folder: string;
  /** Stable id so re-upload overwrites the previous image */
  publicId: string;
};

export async function uploadImageBuffer(
  options: UploadImageOptions,
): Promise<UploadImageResult> {
  try {
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: options.folder,
          public_id: options.publicId,
          overwrite: true,
          invalidate: true,
          resource_type: "image",
        },
        (error, uploaded) => {
          if (error || !uploaded?.secure_url || !uploaded.public_id) {
            reject(error ?? new Error("Cloudinary upload returned no result"));
            return;
          }
          resolve({
            secure_url: uploaded.secure_url,
            public_id: uploaded.public_id,
          });
        },
      );

      stream.end(options.buffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new AppError(500, "INTERNAL_ERROR", "Failed to upload image");
  }
}

export function requireUploadedImage(file?: Express.Multer.File) {
  if (!file) {
    throw new AppError(400, "VALIDATION_ERROR", "Image file is required", [
      { field: "image", message: "Image file is required" },
    ]);
  }
  return file;
}
