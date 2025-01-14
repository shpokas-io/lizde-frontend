import React from "react";
import HeroBackground from "../../hero-section/HeroBackground";
import HeroContent from "../../hero-section/HeroContent";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] md:h-[70vh] flex items-center justify-center">
      <HeroBackground imageUrl="/images/hero-background.jpg" />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <HeroContent />
    </section>
  );
};

export default HeroSection;
