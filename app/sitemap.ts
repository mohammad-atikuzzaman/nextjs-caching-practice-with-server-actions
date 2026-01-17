import { getBlogs } from "@/utils/getBlogsData";
import { getAllProducts } from "@/utils/getProductsData";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://yourdomain.com";

    // Get all blogs and products
    const blogs = await getBlogs();
    const products = await getAllProducts();

    const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog._id}`,
        lastModified: new Date(blog.createdAt || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    const productUrls = products.map((product) => ({
        url: `${baseUrl}/products/${product._id}`,
        // Use availableFrom as a proxy for last modified if updatedAt is not available
        lastModified: new Date(product.availableFrom || new Date()),
        changeFrequency: "daily" as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/blogs`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/products`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        ...blogUrls,
        ...productUrls,
    ];
}
