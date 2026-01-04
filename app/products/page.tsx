import PaginationControls from "@/components/PaginationControls";
import BackButton from "@/ui/BackButton";
import { getProductsPaginated } from "@/utils/getProductsData";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 9;

  const { products, pagination } = await getProductsPaginated(
    currentPage,
    limit
  );

  return {
    title: `Products - Page ${currentPage}`,
    description: `Browse our collection of ${products.length} products. Page ${currentPage} of ${pagination.totalPages}.`,
    openGraph: {
      title: `Products - Page ${currentPage}`,
      description: `Browse our collection of ${products.length} products. Page ${currentPage} of ${pagination.totalPages}.`,
      type: "website",
    },
  };
}

const Products = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 9;

  const { products, pagination } = await getProductsPaginated(
    currentPage,
    limit
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          <BackButton />
          Products : {pagination.total}
        </h1>
        <Link href="/products/add-product">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Add Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        <>
          <Suspense fallback={<ProductGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} data={product} />
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

export default Products;

interface BlogInterface {
  data: {
    _id: string;
    name: string;
    description: string;
    brand: string;
    price: number;
    inStock: boolean;
    availableFrom: string;
  };
}

const ProductCard = ({ data }: BlogInterface) => {
  const { _id, name, description, brand, inStock } = data;

  return (
    <article className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2 line-clamp-2">{name}</h2>

      <p className="text-gray-600 mb-2 line-clamp-3">{description}</p>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          By <span className="font-medium">{brand}</span>
        </p>
        <p>{inStock ? "🟢" : "🔴"}</p>
      </div>

      <Link
        href={`/products/${_id}`}
        className="inline-block mt-4 text-blue-600 hover:text-blue-800 hover:underline font-medium"
      >
        Read more →
      </Link>
    </article>
  );
};

// Loading Skeleton
const ProductGridSkeleton = () => {
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
