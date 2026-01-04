import { connectDB } from "@/database/dbConfig";
import Blog from "@/models/Blog";
import mongoose from "mongoose";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// Optimized for Build Time
export const getBlogIdsForStaticParams = cache(
  async (limit = 20) => {
    return await unstable_cache(
      async () => {
        await connectDB();
        const blogs = await Blog.find({})
          .select("_id")
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean()
          .exec();

        return blogs.map((blog) => blog._id.toString());
      },
      [`blog-ids-limit-${limit}`],
      { tags: ["blogs"] }
    )();
  }
);

export const getBlogs = cache(
  async () => {
    return await unstable_cache(
      async () => {
        await connectDB();
        const blogs = await Blog.find({})
          .select("title content author createdAt")
          .sort({ createdAt: -1 })
          .lean()
          .exec();

        return blogs.map((blog) => ({
          ...blog,
          _id: blog._id.toString(),
          createdAt: blog.createdAt?.toISOString(),
        }));
      },
      ["all-blogs"],
      { tags: ["blogs"] }
    )();
  }
);

export const getBlogById = cache(
  async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return await unstable_cache(
      async () => {
        await connectDB();
        const blog = await Blog.findById(id).lean().exec();

        if (!blog) return null;

        return {
          ...blog,
          _id: blog._id.toString(),
          createdAt: blog.createdAt?.toISOString(),
          updatedAt: blog.updatedAt?.toISOString(),
        };
      },
      [`blog-${id}`],
      { tags: ["blogs"] }
    )();
  }
);

export const getBlogsPaginated = cache(
  async (page = 1, limit = 10) => {
    return await unstable_cache(
      async () => {
        await connectDB();
        const skip = (page - 1) * limit;

        const [blogs, total] = await Promise.all([
          Blog.find({})
            .select("title content author createdAt")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec(),
          Blog.countDocuments(),
        ]);

        return {
          blogs: blogs.map((blog) => ({
            ...blog,
            _id: blog._id.toString(),
            createdAt: blog.createdAt?.toISOString(),
          })),
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        };
      },
      [`blogs-page-${page}-limit-${limit}`],
      { tags: ["blogs"] }
    )();
  }
);