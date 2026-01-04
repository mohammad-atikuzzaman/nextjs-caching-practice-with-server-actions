import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto py-8">
      <Box
        url="/blogs"
        title="Blogs"
        description=" Explore our latest articles and insights."
      />
      <Box
        url="/products"
        title="Products"
        description="Browse our range of products."
      />
      <Box
        url="/users"
        title="Users"
        description="Manage user accounts and profiles."
      />
      <Box
        url="https://atikuzzaman.vercel.app/"
        title="developer"
        description="Learn about developer and contact him"
      />
    </div>
  );
}

interface boxInterface {
  url: string;
  title: string;
  description: string;
}

function Box({ url, title, description }: boxInterface) {
  return (
    <Link href={url} className="block h-full">
      <div className="h-full bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:bg-blue-50 hover:shadow-lg transition duration-300 flex flex-col justify-center items-center text-center">
        <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
    </Link>
  );
}
