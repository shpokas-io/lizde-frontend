"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Courses", href: "/courses" },
    // { label: "Log In", href: "/login" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navOpacity =
    scrollY < 50 ? "opacity-100" : "opacity-0 pointer-events-none";
  const showBackToTop = scrollY > 300;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`
          bg-background shadow-md fixed top-0 left-0 w-full z-50 
          transition-opacity duration-300
          ${navOpacity}
        `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2 md:py-2">
          <div className="flex items-center">
            <div className="relative w-[100px] h-[60px]">
              <Image
                src="/images/logo-black.png"
                alt="Takadė Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-gray-600 text-xl font-semibold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden text-gray-800 text-3xl"
            onClick={toggleMenu}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <nav className="flex flex-col space-y-6 p-6 text-xl font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-800 hover:text-gray-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 bg-gray-800 text-white 
                     p-3 rounded-full shadow-lg hover:bg-gray-700 
                     transition-colors flex items-center justify-center z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default NavBar;
