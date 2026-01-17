/**
 * Centralized Cache Configuration
 * 
 * This file contains reusable cache utilities and configurations
 * to ensure consistent caching behavior across the application.
 */

import { cache } from "react";
import { unstable_cache } from "next/cache";

/**
 * Cache Tags used throughout the application
 */
export const CACHE_TAGS = {
    USERS: "users",
    BLOGS: "blogs",
    PRODUCTS: "products",
} as const;

/**
 * Cache Durations (in seconds)
 * Note: We primarily use on-demand revalidation, but these serve as fallback
 */
export const CACHE_DURATIONS = {
    // No time-based revalidation - we use on-demand revalidation only
    // These are kept for reference and potential future use
    NEVER: false, // Never revalidate automatically
    HOUR: 60 * 60,
    DAY: 60 * 60 * 24,
} as const;

/**
 * Wrapper for external API calls with proper caching
 * Uses both React.cache (request deduplication) and unstable_cache (persistent cache)
 */
export function createCachedFetcher<T>(
    fetchFn: () => Promise<T>,
    cacheKey: string[],
    tags: string[]
) {
    return cache(async () => {
        return await unstable_cache(
            fetchFn,
            cacheKey,
            { tags }
        )();
    });
}

/**
 * Wrapper for database queries with proper caching
 * Uses both React.cache (request deduplication) and unstable_cache (persistent cache)
 */
export function createCachedQuery<T>(
    queryFn: () => Promise<T>,
    cacheKey: string[],
    tags: string[]
) {
    return cache(async () => {
        return await unstable_cache(
            queryFn,
            cacheKey,
            { tags }
        )();
    });
}
