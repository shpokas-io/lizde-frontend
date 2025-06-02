"use client";
import Button from "@/components/common/Button";

const MentorSection = () => {
  const videoUrl = "https://www.youtube.com/watch?v=NyxhJWJDfjc";

  const getEmbedUrl = (url: string) => url.replace("watch?v=", "embed/");

  return (
    <section className="py-24 bg-[#1a1a1a] text-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl lg:text-5xl text-white font-bold mb-12">
          <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            Mentoriaus Pavelo
          </span>
          <br />
          <span className="text-white">žodis apie projektą</span>
        </h2>

        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={getEmbedUrl(videoUrl)}
              title="Mentor Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-12">
          <Button
            text="Pradėk dabar"
            href="/reviews"
            className="bg-orange-500 text-white text-lg font-bold py-4 px-8 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
