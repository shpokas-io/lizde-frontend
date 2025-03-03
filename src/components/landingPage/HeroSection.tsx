"use client";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";

const HeroSection = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative h-[90vh] md:h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      />

      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Tavo garsai
          <br />
          Tavo taisyklės
          <br />
          Mūsų žinios
        </h1>
        <Button
          className="mt-6 px-6 py-3 text-lg"
          text="Pradėk dabar"
          href="/courses"
        />
      </div>

      {/* Clickable Bouncing Scroll Indicator */}
      {showScrollIndicator && (
        <button
          onClick={scrollToAbout}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 cursor-pointer focus:outline-none"
          aria-label="Scroll to about section"
        >
          <div className="w-8 h-8 animate-bounce-slow">
            <svg
              className="w-8 h-8 text-white hover:text-gray-300 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>
      )}
    </section>
  );
};

export default HeroSection;
