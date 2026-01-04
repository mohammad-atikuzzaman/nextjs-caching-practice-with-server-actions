"use server";

import { connectDB } from "@/database/dbConfig";
import Blog from "@/models/Blog";
import { blogSchema } from "@/lib/validators/blog.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { BlogActionState } from "@/types/action.blog";

export async function createBlog(
  _: BlogActionState,
  formData: FormData
): Promise<BlogActionState> {
  await connectDB();

  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
    author: formData.get("author"),
  };

  const parsed = blogSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await Blog.create(parsed.data);
  } catch (error) {
    console.error("DB error:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to create blog. Please try again."],
      },
    };
  }

  revalidatePath("/blogs");
  redirect("/blogs");
}
