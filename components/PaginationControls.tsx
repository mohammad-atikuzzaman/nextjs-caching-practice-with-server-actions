// components/PaginationControls.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  total: number;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  total,
}: PaginationControlsProps) => {
  const pathname = usePathname();

  const createPageURL = (page: number) => {
    return `${pathname}?page=${page}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p className="text-sm text-gray-600">
        Showing page {currentPage} of {totalPages} ({total} total blogs)
      </p>

      <div className="flex items-center gap-2">
        <Link
          href={createPageURL(currentPage - 1)}
          className={`px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "hover:bg-gray-50"
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageURL(page as number)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </Link>
          )
        )}

        <Link
          href={createPageURL(currentPage + 1)}
          className={`px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 transition-colors ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed pointer-events-none"
              : "hover:bg-gray-50"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default PaginationControls;
