"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children }: { children: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black text-white px-4 py-2 disabled:opacity-50"
    >
      {pending ? "Loading..." : `${children}`}
    </button>
  );
}
