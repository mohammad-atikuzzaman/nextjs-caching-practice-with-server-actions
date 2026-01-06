"use client";

import { revalidateUsers } from "@/actions/revalidateUserAction";

const RevalidateBtn = () => {
  return (
    <button
      className="bg-blue-600 px-3 py-0.5 rounded-md text-white font-semibold"
      onClick={revalidateUsers}
    >
      Revalidate 🗘
    </button>
  );
};

export default RevalidateBtn;
