"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUp, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Pradžia", href: "/" },
  { label: "Apie", href: "/#about" },
  { label: "Kursai", href: "/courses" },
  { label: "Pirkti", href: "/buy" },
];

const NavLink = ({ href, label, onClick, className = "" }: { 
  href: string, 
  label: string, 
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
  className?: string 
}) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-gray-200 hover:text-orange-500 transition-colors duration-200 ${className}`}
  >
    {label}
  </Link>
);

const AuthButton = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-gray-200 text-sm">
          {user.email}
        </span>
        <button
          onClick={signOut}
          className="flex items-center gap-2 text-gray-200 hover:text-orange-500 transition-colors duration-200"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span>Atsijungti</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 text-gray-200 hover:text-orange-500 transition-colors duration-200"
    >
      <FaUser className="w-4 h-4" />
      <span>Prisijungti</span>
    </Link>
  );
};

const MobileMenu = ({ isOpen, onClose, scrollToAbout }: { 
  isOpen: boolean, 
  onClose: () => void,
  scrollToAbout: (e: React.MouseEvent<HTMLAnchorElement>) => void 
}) => {
  const { user, signOut } = useAuth();

  return (
    <div
      className={`
        md:hidden fixed inset-0 z-40 bg-[#121212]/95 backdrop-blur-md
        transition-transform duration-300 transform
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            onClick={() => {
              onClose();
              if (link.href === "/#about") {
                scrollToAbout({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>);
              }
            }}
            className="text-2xl font-medium"
          />
        ))}
        <div className="pt-4 flex flex-col items-center gap-4">
          {user ? (
            <>
              <span className="text-gray-200 text-lg">
                {user.email}
              </span>
              <button
                onClick={() => {
                  signOut();
                  onClose();
                }}
                className="flex items-center gap-2 text-gray-200 hover:text-orange-500 transition-colors duration-200 text-xl"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Atsijungti</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="flex items-center gap-2 text-gray-200 hover:text-orange-500 transition-colors duration-200 text-xl"
            >
              <FaUser className="w-5 h-5" />
              <span>Prisijungti</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                onClick={link.href === "/#about" ? scrollToAbout : undefined}
                className="text-sm font-medium"
              />
            ))}
            <div className="ml-8">
              <AuthButton />
            </div>
          </nav>

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
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} scrollToAbout={scrollToAbout} />

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
