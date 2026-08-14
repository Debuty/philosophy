import multer from "multer";
import { AppError } from "../lib/errors.js";

/** In-memory uploads — file buffer is sent to Cloudinary (no disk writes). */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new AppError(400, "VALIDATION_ERROR", "Only image uploads are allowed"));
      return;
    }
    cb(null, true);
  },
});
