
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface UserPaginationProps {
    currentPage: number;
    hasMore: boolean;
}

const UserPagination = ({ currentPage, hasMore }: UserPaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-12 mb-8">
            <Link
                href={createPageURL(currentPage - 1)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300 font-medium ${currentPage <= 1
                        ? "border-gray-100 text-gray-300 pointer-events-none cursor-not-allowed bg-gray-50"
                        : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md"
                    }`}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
            >
                <ChevronLeftIcon className="w-4 h-4" />
                <span>Previous</span>
            </Link>

            <div className="flex items-center gap-2 px-4">
                <span className="text-gray-500 text-sm font-medium">Page</span>
                <span className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-blue-200 shadow-lg">
                    {currentPage}
                </span>
            </div>

            <Link
                href={createPageURL(currentPage + 1)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full border transition-all duration-300 font-medium ${!hasMore
                        ? "border-gray-100 text-gray-300 pointer-events-none cursor-not-allowed bg-gray-50"
                        : "border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md"
                    }`}
                aria-disabled={!hasMore}
                tabIndex={!hasMore ? -1 : undefined}
            >
                <span>Next</span>
                <ChevronRightIcon className="w-4 h-4" />
            </Link>
        </div>
    );
};

export default UserPagination;
