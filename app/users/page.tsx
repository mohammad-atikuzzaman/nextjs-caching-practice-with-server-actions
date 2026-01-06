import RevalidateBtn from "@/components/RevalidateBtn";
import { getAllUsers, User } from "@/utils/getUsersData";
import Link from "next/link";
import { Suspense } from "react";
import { UserIcon, PhoneIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface UserProps {
  data: User;
}

const Users = async () => {
  const users = await getAllUsers();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">{users.length} total users</p>
        </div>
        
        <div className="flex gap-3">
          <RevalidateBtn />
          <Link
            href="/users/add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Add User
          </Link>
        </div>
      </div>

      <Suspense fallback={<UsersLoading />}>
        {users.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <UserIcon className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-4 text-gray-600">No users found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user._id} data={user} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Users;

const UserCard = ({ data }: UserProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-sm transition-all bg-white">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <UserIcon className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-gray-900">{data.name}</h2>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm">Age: {data.age}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-700">
          <PhoneIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{data.phone}</span>
        </div>
      </div>
    </div>
  );
};

const UsersLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-gray-200 rounded-lg w-9 h-9" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};