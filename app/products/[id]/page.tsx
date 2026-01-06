
import BackButton from "@/ui/BackButton";
import { getProductById, getProductIdsForStaticParams } from "@/utils/getProductsData";
import { notFound } from "next/navigation";

// Enable ISR
export const dynamicParams = true; // Allow new paths to be generated on demand

export async function generateStaticParams() {
  const ids = await getProductIdsForStaticParams(20); // Only pre-render top 20
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
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | My Shop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                {product.brand}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {product.inStock ? (
                  <span className="flex items-center justify-end gap-1 text-green-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    In Stock
                  </span>
                ) : (
                  <span className="flex items-center justify-end gap-1 text-red-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Out of Stock
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="prose prose-lg text-gray-700 max-w-none mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="leading-relaxed">{product.description}</p>
          </div>

          <div className="border-t border-gray-100 pt-6 mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Available from:{" "}
              {new Date(product.availableFrom).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-0.5">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
