import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] md:h-[100vh] flex items-center justify-center">
      <HeroBackground imageUrl="/images/hero-background.jpg" />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <HeroContent />
    </section>
  );
};

export default HeroSection;
