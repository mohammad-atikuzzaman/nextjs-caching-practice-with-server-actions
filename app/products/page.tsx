import PaginationControls from "@/components/PaginationControls";
import BackButton from "@/ui/BackButton";
import { getProductsPaginated } from "@/utils/getProductsData";
import Link from "next/link";
import { Suspense } from "react";
import {
  ShoppingBagIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

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
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBagIcon className="w-6 h-6" />
              Products
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {pagination.total} total products • Page {pagination.page} of {pagination.totalPages}
            </p>
          </div>
        </div>
        
        <Link 
          href="/products/add-product"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-400" />
          <p className="mt-4 text-gray-600">No products found</p>
        </div>
      ) : (
        <>
          <Suspense fallback={<ProductGridSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

interface ProductInterface {
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

const ProductCard = ({ data }: ProductInterface) => {
  const { _id, name, description, brand, price, inStock } = data;

  return (
    <article className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all bg-white">
      <div className="space-y-3">
        <h2 className="font-bold text-gray-900 line-clamp-2 text-lg">{name}</h2>
        
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-700">
            <BuildingStorefrontIcon className="w-4 h-4" />
            <span>{brand}</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
            <CurrencyDollarIcon className="w-4 h-4" />
            <span>{price}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Link
            href={`/products/${_id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View details
          </Link>
          
          <div className="flex items-center gap-1">
            {inStock ? (
              <>
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-600">In Stock</span>
              </>
            ) : (
              <>
                <XCircleIcon className="w-4 h-4 text-red-600" />
                <span className="text-xs text-red-600">Out of Stock</span>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

// Loading Skeleton
const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-lg p-5 animate-pulse bg-white"
        >
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
            
            <div className="pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};