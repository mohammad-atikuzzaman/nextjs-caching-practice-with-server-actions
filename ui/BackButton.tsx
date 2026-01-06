"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
      aria-label="Go back"
    >
      <ArrowLeftIcon className="w-4 h-4" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
}