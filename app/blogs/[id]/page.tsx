import BackButton from "@/ui/BackButton";
import { getBlogById } from "@/utils/getBlogsData";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <BackButton />
      </div>
      <p className="text-sm text-gray-500 mb-6">
        By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-lg text-gray-700">{blog.content}</div>
    </div>
  );
}
