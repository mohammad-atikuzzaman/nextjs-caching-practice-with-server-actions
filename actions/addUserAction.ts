"use server";

import { userSchema } from "@/lib/validators/user.schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { UserActionState } from "@/types/action.user";


export async function addUserAction(
  _prevState: UserActionState,
  formData: FormData
): Promise<UserActionState> {

  const rawData = {
    name: formData.get("name")?.toString(),
    age: formData.get("age") ? Number(formData.get("age")) : undefined,
    phone: formData.get("phone")?.toString(),
  };

  const parsed = userSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const apiUrl = process.env.API_URL || "http://localhost:8000";

    const res = await fetch(`${apiUrl}/persons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      let errorMessage = "Something went wrong in the backend";
      try {
        const errorJson = await res.json();
        errorMessage = errorJson.message || JSON.stringify(errorJson);
      } catch {
        errorMessage = await res.text();
      }
      throw new Error(errorMessage);
    }
    revalidatePath("/users"); 

  } catch (error) {
    console.error("Create user failed:", error);

    let message = "Failed to create user. Please try again.";
    if (error instanceof Error) {
      message = error.message;
    }

    return {
      success: false,
      errors: {
        _form: [message],
      },
    };
  }
  redirect("/users");
}