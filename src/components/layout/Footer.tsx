import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1d21] text-center">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/logo-white.png"
            alt="Takade Logo"
            width={180}
            height={54}
            className="mx-auto h-auto"
          />
        </div>

        {/* Navigation Links */}
        <div className="mb-4">
          <Link
            href="/courses"
            className="text-gray-300 hover:text-white mx-3 text-sm"
          >
            My Courses
          </Link>
          <span className="text-gray-500">|</span>
          <Link
            href="/about"
            className="text-gray-300 hover:text-white mx-3 text-sm"
          >
            About
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm">© {currentYear} Takade</div>
      </div>
    </footer>
  );
}
