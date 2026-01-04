"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="bg-blue-600 px-3 rounded-md text-white mx-2"
    >
      ↩
    </button>
  );
}
