import BackButton from "@/ui/BackButton";
import { getBlogById, getBlogIdsForStaticParams } from "@/utils/getBlogsData";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = await getBlogIdsForStaticParams(20);
  return ids.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.content.substring(0, 160) + "...",
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160) + "...",
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.author],
    },
  };
}

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
