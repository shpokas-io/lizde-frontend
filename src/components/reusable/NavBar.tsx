import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/images/lizdas-logo.png"
            alt="Lizdas Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">Lizdas</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/courses" className="hover:underline">
            Courses
          </Link>

          {/* User Icon */}
          <button className="text-2xl">
            <FaUserCircle />
          </button>
        </div>
      </div>
    </nav>
  );
}
