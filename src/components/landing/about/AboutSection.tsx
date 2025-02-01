import Button from "@/components/common/Button";

const AboutSection = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8 space-y-8">
        {/* First Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Šis kursas skirtas tau, jei:
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Esi ambicingas kūrėjas...</li>
              <li>Kuri alternatyvių žanrų muziką.</li>
              {/* etc. */}
            </ul>
          </div>
          <img
            src="/images/about-section.jpg"
            alt="Engineer recording drums"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Second Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <img
            src="/images/about-section.jpg"
            alt="Engineer working in studio"
            className="rounded-lg shadow-lg lg:order-1 pt-40"
          />
          <div>
            <h3 className="text-xl font-bold mb-4">We&apos;ll help you:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Get your mixes to a competitive quality...</li>
              <li>Install a workflow that provides clarity...</li>
              {/* etc. */}
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="text-center">
          <Button
            text="Pradėk dabar"
            href="/free-class"
            className="bg-orange-500 text-white text-lg font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
