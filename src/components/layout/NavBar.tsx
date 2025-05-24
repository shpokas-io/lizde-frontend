"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Courses", href: "/courses" },
    { label: "Mentors", href: "/#mentors" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled 
            ? 'bg-[#121212]/90 backdrop-blur-md border-b border-gray-800/50' 
            : 'bg-[#121212]/50'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="relative w-[120px] h-[40px]">
            <Image
              src="/images/logo-white.png"
              alt="Takadė Logo"
              width={120}
              height={40}
              className="w-full h-full object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              <Link
                href="/#about"
                onClick={scrollToAbout}
                className="text-gray-200 hover:text-orange-500 text-sm font-medium
                       transition-colors duration-200"
              >
                About
              </Link>
              <Link
                href="/courses"
                className="text-gray-200 hover:text-orange-500 text-sm font-medium
                       transition-colors duration-200"
              >
                Courses
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute w-full h-0.5 bg-white transform transition-all duration-300
                         ${isOpen ? 'rotate-45 top-2' : 'rotate-0 top-0'}`}
              />
              <span
                className={`absolute w-full h-0.5 bg-white top-2 transition-all duration-200
                         ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute w-full h-0.5 bg-white transform transition-all duration-300
                         ${isOpen ? '-rotate-45 top-2' : 'rotate-0 top-4'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden fixed inset-0 z-40 bg-[#121212]/95 backdrop-blur-md
            transition-transform duration-300 transform
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link
              href="/#about"
              onClick={(e) => {
                setIsOpen(false);
                scrollToAbout(e);
              }}
              className="text-gray-200 hover:text-orange-500 text-2xl font-medium
                     transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="text-gray-200 hover:text-orange-500 text-2xl font-medium
                     transition-colors duration-200"
            >
              Courses
            </Link>
          </div>
        </div>
      </header>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`
          fixed bottom-6 right-6 z-50 p-3 rounded-full
          bg-orange-500 hover:bg-orange-600 text-white
          transition-all duration-300 transform shadow-lg
          ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
        `}
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </>
  );
};

export default NavBar;
