import Button from "@/components/common/Button";

const HeroSection = () => {
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
    </section>
  );
};

export default HeroSection;
