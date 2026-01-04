import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center py-8 container mx-auto">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          404 - Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
