import AboutContent from "./AboutContent";
import AboutImages from "./AboutImages";
import Button from "@/components/reusable/Button";

const AboutSection = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 gap-8">
        {/* Text content first */}
        <AboutContent />

        {/* Images on desktop, below content on mobile */}
        <AboutImages />
      </div>

      {/* CTA Button at the end */}
      <div className="mt-8 text-center">
        <Button
          text="Get Started with a Free Class"
          href="/free-class"
          className="bg-orange-500 text-white text-lg font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition"
        />
      </div>
    </section>
  );
};

export default AboutSection;
