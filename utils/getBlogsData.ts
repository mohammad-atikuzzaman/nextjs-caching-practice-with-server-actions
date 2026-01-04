import { connectDB } from "@/database/dbConfig";
import Blog from "@/models/Blog";
import mongoose from "mongoose";

export async function getBlogs() {
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
}

export async function getBlogById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  await connectDB();
  
  const blog = await Blog.findById(id)
    .lean()
    .exec();

  if (!blog) return null;

  return {
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt?.toISOString(),
    updatedAt: blog.updatedAt?.toISOString(),
  };
}

export async function getBlogsPaginated(page = 1, limit = 10) {
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
    Blog.countDocuments()
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
}