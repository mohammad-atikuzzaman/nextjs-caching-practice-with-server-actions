'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}