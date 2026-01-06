import Link from "next/link";
import {
  DocumentTextIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CodeBracketIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const boxes = [
    {
      url: "/blogs",
      title: "Blog Posts",
      description: "Explore our latest articles and insights",
      icon: DocumentTextIcon,
      color: "blue",
    },
    {
      url: "/products",
      title: "Products",
      description: "Browse our range of products",
      icon: ShoppingBagIcon,
      color: "green",
    },
    {
      url: "/users",
      title: "Users",
      description: "Manage user accounts and profiles",
      icon: UserGroupIcon,
      color: "purple",
    },
    {
      url: "https://atikuzzaman.vercel.app/",
      title: "Developer",
      description: "Learn about the developer and contact",
      icon: CodeBracketIcon,
      color: "gray",
      external: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Manage your application content and data
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {boxes.map((box) => (
          <Box key={box.title} {...box} />
        ))}
      </div>
    </div>
  );
}

interface BoxInterface {
  url: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  external?: boolean;
}

function Box({
  url,
  title,
  description,
  icon: Icon,
  color,
  external,
}: BoxInterface) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    gray: "bg-gray-50 text-gray-600 border-gray-100",
  };

  return (
    <Link
      href={url}
      className="block h-full"
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <div
        className={`
        h-full border rounded-lg p-5 
        hover:border-gray-300 hover:shadow-sm 
        transition-all bg-white
        ${colorClasses[color as keyof typeof colorClasses]}
      `}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div
              className={`p-2 rounded-lg ${
                colorClasses[color as keyof typeof colorClasses].split(" ")[0]
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            {external && (
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded">
                External
              </span>
            )}
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>

          <div className="flex items-center text-sm font-medium text-gray-700">
            <span>View</span>
            <ArrowRightIcon className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
