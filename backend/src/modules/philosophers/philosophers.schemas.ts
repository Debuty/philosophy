import { z } from "zod";

const eraSlugSchema = z.enum([
  "ancient",
  "medieval",
  "earlyModern",
  "modern",
  "contemporary",
]);

const schoolSlugSchema = z.enum([
  "idealism",
  "materialism",
  "existentialism",
  "stoicism",
  "epicureanism",
  "rationalism",
  "empiricism",
]);

const booleanQuery = z
  .union([z.boolean(), z.enum(["true", "false", "1", "0"])])
  .optional()
  .transform((value) => {
    if (value === undefined) return false;
    if (typeof value === "boolean") return value;
    return value === "true" || value === "1";
  });

export const listPhilosophersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(12),
  search: z.string().trim().min(1).optional(),
  era: eraSlugSchema.optional(),
  school: schoolSlugSchema.optional(),
  featured: booleanQuery,
  limit: z.coerce.number().int().positive().max(50).default(3),
});

export const philosopherIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type ListPhilosophersQuery = z.infer<typeof listPhilosophersQuerySchema>;
