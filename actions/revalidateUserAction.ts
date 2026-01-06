"use server";

import { revalidatePath } from "next/cache";

export async function revalidateUsers() {
  revalidatePath("/users");
}
