import { cache } from "react";
import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-config";

export interface User {
  _id: string;
  name: string;
  age: number;
  phone: string;
  createdAt: string;
}

/**
 * Fetch all users with pagination from external API
 * Uses both cache() for request deduplication and unstable_cache for persistent caching
 * Revalidated on-demand only via revalidateTag("users")
 */

const API_URL = process.env.API_URL || "http://localhost:8000";

export const getAllUsers = cache(
  async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }): Promise<User[]> => {
    return await unstable_cache(
      async () => {
        try {
          const response = await fetch(
            `${API_URL}/users?page=${page}&limit=${limit}`,
            {
              // No cache control - let unstable_cache handle it
              cache: "no-store", // Prevent browser caching, rely on Next.js cache
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch users: ${response.status} ${errorText}`);
            throw new Error(`Failed to fetch users: ${response.status}`);
          }

          const data: { data: User[] } = await response.json();
          return data.data;
        } catch (error) {
          console.error("getAllUsers error:", error);
          // Return empty array to prevent page crash, let UI handle empty state
          return [];
        }
      },
      [`users-page-${page}-limit-${limit}`], // Unique cache key per page/limit
      {
        tags: [CACHE_TAGS.USERS], // Tag for on-demand revalidation
        // No revalidate time - we use on-demand revalidation only
      }
    )();
  }
);

/**
 * Fetch a single user by ID from external API
 * Uses both cache() for request deduplication and unstable_cache for persistent caching
 * Revalidated on-demand only via revalidateTag("users")
 */
export const getUserById = cache(
  async (id: string) => {
    if (!id) return null;

    return await unstable_cache(
      async () => {
        try {
          const response = await fetch(`${API_URL}/users/${id}`, {
            cache: "no-store", // Prevent browser caching, rely on Next.js cache
          });

          if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch user ${response.status}`);
          }

          return await response.json();
        } catch (error) {
          console.error("getUser error", error);
          return null;
        }
      },
      [`user-${id}`], // Unique cache key per user ID
      {
        tags: [CACHE_TAGS.USERS], // Tag for on-demand revalidation
        // No revalidate time - we use on-demand revalidation only
      }
    )();
  }
);
