import BackButton from "@/ui/BackButton";
import Link from "next/link";

const Products = () => {
  const blogs = [];
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          <BackButton />
          Blogs : 11
        </h1>
        <Link href="/products/add-product">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Add Product
          </button>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found.</p>
        </div>
      ) : (
        <>
          {/* <Suspense fallback={<BlogsGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} data={blog} />
              ))}
            </div>
          </Suspense> */}
          {/* 
          <PaginationControls
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
          /> */}
        </>
      )}
    </div>
  );
};

export default Products;
