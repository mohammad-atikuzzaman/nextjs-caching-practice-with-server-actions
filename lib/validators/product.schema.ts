import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(150, "Name too long"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description too long"),

  brand: z
    .string()
    .min(2, "Brand name too short")
    .max(20, "Brand name too long"),
  price: z
    .number()
    .min(2, "Price name too short")
    .max(10, "Price name too long"),
});

export type BlogInput = z.infer<typeof productSchema>;
