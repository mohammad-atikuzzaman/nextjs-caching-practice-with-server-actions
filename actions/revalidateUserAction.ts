"use server";

import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";

export async function revalidateUsers() {
  revalidateTag(CACHE_TAGS.USERS, "max");
}
