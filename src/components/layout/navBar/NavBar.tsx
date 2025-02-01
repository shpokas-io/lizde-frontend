"use client";
import { useState } from "react";
import Image from "next/image";
import NavItem from "./NavItem";
import BurgerMenu from "./BurgerMenu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "/about" },
    { label: "Course", href: "/courses" },
    { label: "Videos", href: "/videos" },
    { label: "Log In", href: "/login" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/images/about-section.jpg"
            alt="Logo"
            width={50}
            height={50}
            className="h-8 w-8 rounded-xl"
          />
          <span className="text-xl font-bold text-gray-800">
            Lizdas_Project
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavItem key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={toggleMenu}
        >
          {isOpen ? "x" : "☰"}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && <BurgerMenu links={navLinks} />}
    </header>
  );
};

export default NavBar;
