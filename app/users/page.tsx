
import RevalidateBtn from "@/components/RevalidateBtn";
import UserPagination from "@/components/UserPagination";
import { getAllUsers, User } from "@/utils/getUsersData";
import { CalendarIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Users List | My App",
  description: "Browse all users in our system efficiently.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PAGE_SIZE = 9;

const Users = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  // Fetch one extra item to determine if there is a next page
  const limit = PAGE_SIZE;
  const usersWithExtra = await getAllUsers({ page, limit: limit + 1 });

  const hasMore = usersWithExtra.length > limit;
  const users = hasMore ? usersWithExtra.slice(0, limit) : usersWithExtra;


  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Users
            <span className="text-blue-600">.</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage and view your user base
          </p>
        </div>

        <div className="flex gap-3">
          <RevalidateBtn />
          <Link
            href="/users/add"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
          >
            <span>Add User</span>
          </Link>
        </div>
      </div>

      <Suspense fallback={<UsersLoading />}>
        {users?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <UserIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">No users found</h3>
            <p className="mt-2 text-gray-500 max-w-sm text-center">
              It seems there are no users in the database page {page}. Try adding a new user or go back.
            </p>
            {page > 1 && (
              <Link href="/users?page=1" className="mt-6 text-blue-600 font-medium hover:underline">
                Go to first page
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {users?.map((user) => (
                <UserCard key={user._id} data={user} />
              ))}
            </div>

            <UserPagination currentPage={page} hasMore={hasMore} />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Users;

interface UserProps {
  data: User;
}

const UserCard = ({ data }: UserProps) => {
  return (
    <Link
      href={`/users/${data._id}`}
      className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-gray-100/50 hover:border-blue-100 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </div>

      <div className="flex items-start gap-4 mb-5">
        <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
          <UserIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
            {data.name}
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">User ID: {data._id.slice(-6)}</p>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-900 transition-colors">
          <CalendarIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">Age: {data.age}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-900 transition-colors">
          <PhoneIcon className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium">{data.phone}</span>
        </div>
      </div>
    </Link>
  );
};

const UsersLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-2xl p-6 animate-pulse"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 bg-gray-100 rounded-xl w-12 h-12" />
            <div className="space-y-2 py-1">
              <div className="h-5 bg-gray-100 rounded-md w-32" />
              <div className="h-3 bg-gray-100 rounded-md w-20" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-100 rounded-full" />
              <div className="h-4 bg-gray-100 rounded-md w-24" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-100 rounded-full" />
              <div className="h-4 bg-gray-100 rounded-md w-36" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
