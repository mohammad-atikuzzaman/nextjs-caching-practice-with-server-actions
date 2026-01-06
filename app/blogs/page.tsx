import { getBlogsPaginated } from "@/utils/getBlogsData";
import Link from "next/link";
import { Suspense } from "react";
import PaginationControls from "@/components/PaginationControls";
import BackButton from "@/ui/BackButton";
import {
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

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
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <DocumentTextIcon className="w-6 h-6" />
              Blog Posts
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {pagination.total} total posts • Page {pagination.page} of {pagination.totalPages}
            </p>
          </div>
        </div>
        
        <Link 
          href="/blogs/create-blog"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">No blog posts yet</p>
          <Link 
            href="/blogs/create-blog"
            className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Write your first post
          </Link>
        </div>
      ) : (
        <>
          <Suspense fallback={<BlogsGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-white">
      <div className="space-y-4">
        <div>
          <h2 className="font-bold text-gray-900 line-clamp-2 text-lg mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3">
            {content}
          </p>
        </div>
        
        <div className="pt-3 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <UserIcon className="w-4 h-4 text-gray-500" />
            <span>{author}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <time>{formattedDate}</time>
          </div>
        </div>
        
        <Link
          href={`/blogs/${_id}`}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Read full article
          <ArrowRightIcon className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
};

// Loading Skeleton
const BlogsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-lg p-5 animate-pulse bg-white"
        >
          <div className="space-y-4">
            <div>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            
            <div className="h-3 bg-gray-200 rounded w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};