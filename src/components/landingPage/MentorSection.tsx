"use client";
import Button from "@/components/common/Button";

const MentorSection = () => {
  // Hardcoded YouTube link for the POC
  const videoUrl = "https://www.youtube.com/watch?v=9Q_4vUDimdI";

  // Convert YouTube URL to an embed URL
  const getEmbedUrl = (url: string) => url.replace("watch?v=", "embed/");

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl text-black font-bold mb-8">
          Mentoriaus Pavelo žodis apie projektą
        </h2>

        {/* Video Container */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
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

        {/* CTA Button */}
        <div className="mt-10">
          <Button
            text="Pradėk dabar"
            href="/reviews"
            className="bg-[#292f36] text-white text-lg font-bold py-4 px-6 rounded-lg hover:bg-[#1d2129] transition"
          />
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
