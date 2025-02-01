import Button from "@/components/common/Button";

const HeroSection = () => {
  return (
    <section className="relative md:h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-2 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
      />

      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Tavo garsai
          <br />
          Tavo taisyklės
          <br />
          Mūsų žinios
        </h1>
        <Button className="mt-4" text="Pradėk dabar" href="/courses" />
      </div>
    </section>
  );
};

export default HeroSection;
