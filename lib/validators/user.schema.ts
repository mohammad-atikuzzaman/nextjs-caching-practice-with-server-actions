import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name too long"),

  age: z
    .number()
    .min(0, "Age must be at least 0 characters")
    .max(150, "Age too long"),

  phone: z
    .string()
    .min(2, "Phone length too short")
    .max(50, "Phone length too long"),
});

export type UserInput = z.infer<typeof userSchema>;
