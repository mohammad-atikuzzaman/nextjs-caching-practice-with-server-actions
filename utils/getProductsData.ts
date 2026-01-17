import { connectDB } from "@/database/dbConfig";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { cache } from "react";
import { unstable_cache } from "next/cache";

// Optimized for Build Time: Only fetches IDs, limited to top 20
export const getProductIdsForStaticParams = cache(
  async (limit = 20) => {
    return await unstable_cache(
      async () => {
        await connectDB();
        const products = await Product.find({})
          .select("_id")
          // Sort by availability date
          .sort({ availableFrom: -1 })
          .limit(limit)
          .lean()
          .exec();

        return products.map((product) => product._id.toString());
      },
      [`product-ids-limit-${limit}`],
      { tags: ["products"] }
    )();
  }
);

export const getAllProducts = cache(
  async () => {
    return await unstable_cache(
      async () => {
        await connectDB();
        const products = await Product.find({})
          .select("name description price brand inStock availableFrom")
          .sort({ availableFrom: -1 })
          .lean()
          .exec();

        return products.map((product) => ({
          ...product,
          _id: product._id.toString(),
          availableFrom: product.availableFrom?.toISOString(),
        }));
      },
      ["all-products"],
      { tags: ["products"] }
    )();
  }
);

export const getProductById = cache(
  async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return await unstable_cache(
      async () => {
        await connectDB();
        const product = await Product.findById(id).lean().exec();

        if (!product) return null;

        return {
          ...product,
          _id: product._id.toString(),
          availableFrom: product.availableFrom?.toISOString(),
        };
      },
      [`product-${id}`],
      { tags: ["products"] }
    )();
  }
);

export const getProductsPaginated = cache(
  async (page = 1, limit = 10) => {
    return await unstable_cache(
      async () => {
        await connectDB();
        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
          Product.find({})
            .select("name description price brand inStock availableFrom")
            .sort({ availableFrom: -1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec(),
          Product.countDocuments(),
        ]);

        return {
          products: products.map((product) => ({
            ...product,
            _id: product._id.toString(),
            availableFrom: product.availableFrom?.toISOString(),
          })),
          pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
          },
        };
      },
      [`products-page-${page}-limit-${limit}`],
      { tags: ["products"] }
    )();
  }
);