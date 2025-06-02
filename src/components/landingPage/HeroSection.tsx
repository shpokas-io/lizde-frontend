"use client";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import Image from "next/image";

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
    <section className="relative min-h-screen bg-[#121212] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.jpg"
          alt="Music Studio Setup"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-[#121212]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent" />
        
        <div className="absolute inset-0 bg-[#121212]/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-orange-500 font-medium text-xl uppercase tracking-wider">
                Muzikos kūrimo platforma
              </h2>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                  Tavo garsai
                </span>
                <br />
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Tavo taisyklės
                </span>
                <br />
                <span className="text-orange-500">Mūsų žinios</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                Atrask savo unikalų skambesį ir išmok kurti profesionalią muziką 
                su geriausiais industrijos mentoriais.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                text="Pradėk dabar"
                href="/buy"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 
                         rounded-full text-lg font-semibold transition-all duration-300 
                         transform hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
              />
              <Button
                text="Sužinok daugiau"
                href="#about"
                className="bg-transparent border-2 border-orange-500 text-orange-500 
                         hover:bg-orange-500 hover:text-white px-8 py-4 rounded-full 
                         text-lg font-semibold transition-all duration-300"
              />
            </div>
          </div>

          <div className="hidden lg:block relative h-[600px] w-full">
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 to-transparent rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {showScrollIndicator && (
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          aria-label="Scroll to about section"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-orange-500 text-sm font-medium">Sužinok daugiau</span>
            <div className="w-8 h-8 animate-bounce">
              <svg
                className="w-full h-full text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </button>
      )}
    </section>
  );
};

export default HeroSection;
