"use server";

import { connectDB } from "@/database/dbConfig";
import { productSchema } from "@/lib/validators/product.schema";
import Product from "@/models/Product";
import { ProductActionState } from "@/types/action.product";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function addProductAction(
  _: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  await connectDB();

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    brand: formData.get("brand"),
    price: Number(formData.get("price")),
  };

  const parsed = productSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await Product.create(parsed.data);
  } catch (error) {
    console.error("DB error:", error);
    return {
      success: false,
      errors: {
        _form: ["Failed to create blog. Please try again."],
      },
    };
  }

  revalidateTag("products", "max");
  revalidatePath("/products");
  redirect("/products");
}
