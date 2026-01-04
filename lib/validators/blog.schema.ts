import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title too long"),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .max(50000, "Content too long"),

  author: z
    .string()
    .min(2, "Author name too short")
    .max(50, "Author name too long"),
});

export type BlogInput = z.infer<typeof blogSchema>;
