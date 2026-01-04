import { getBlogsPaginated } from "@/utils/getBlogsData";
import Link from "next/link";
import { Suspense } from "react";
import PaginationControls from "@/components/PaginationControls";
import BackButton from "@/ui/BackButton";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 9;

  const { blogs, pagination } = await getBlogsPaginated(currentPage, limit);

  return {
    title: `Blogs - Page ${currentPage}`,
    description: `Read the latest ${blogs.length} blogs from our collection. Page ${currentPage} of ${pagination.totalPages}.`,
    keywords: [
      "blogs",
      "tech blogs",
      "programming",
      "web development",
      "Next.js",
      "React",
    ].join(", "),
    openGraph: {
      title: `Blogs - Page ${currentPage}`,
      description: `Read the latest ${blogs.length} blogs from our collection. Page ${currentPage} of ${pagination.totalPages}.`,
      url: `https://yourdomain.com/blogs?page=${currentPage}`,
      type: "website",
    },
  };
}

const Blogs = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 9;

  const { blogs, pagination } = await getBlogsPaginated(currentPage, limit);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          <BackButton/>
          Blogs : {blogs.length}
        </h1>
        <Link href="/blogs/create-blog">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Post a New Blog
          </button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found.</p>
        </div>
      ) : (
        <>
          <Suspense fallback={<BlogsGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} data={blog} />
              ))}
            </div>
          </Suspense>

          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
          />
        </>
      )}
    </div>
  );
};

export default Blogs;

// Blog Card Component
interface BlogInterface {
  data: {
    _id: string;
    title: string;
    content: string;
    author: string;
    createdAt: string;
  };
}

const BlogCard = ({ data }: BlogInterface) => {
  const { _id, title, content, author, createdAt } = data;

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>

      <p className="text-gray-600 mb-2 line-clamp-3">{content}</p>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          By <span className="font-medium">{author}</span>
        </p>
        <time className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>

      <Link
        href={`/blogs/${_id}`}
        className="inline-block mt-4 text-blue-600 hover:text-blue-800 hover:underline font-medium"
      >
        Read more →
      </Link>
    </article>
  );
};

// Loading Skeleton
const BlogsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-6 animate-pulse"
        >
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};
