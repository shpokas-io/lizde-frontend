import AboutContent from "./AboutContent";
import AboutImages from "./AboutImages";

const AboutSection = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Content */}
        <AboutContent />

        {/* Right Column - Images */}
        <AboutImages />
      </div>
    </section>
  );
};

export default AboutSection;
