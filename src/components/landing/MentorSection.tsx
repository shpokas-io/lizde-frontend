"use client";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";

const MentorSection = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentorVideo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/courses`
        );
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const mentorVideo = data.find(
            (course) => course.title === "Mentor-video"
          );
          if (mentorVideo) {
            setVideoUrl(mentorVideo.videoUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching mentor video:", error);
      }
    };

    fetchMentorVideo();
  }, []);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => url.replace("watch?v=", "embed/");

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl text-black font-bold mb-8">
          Mentoriaus Pavelo žodis apie projektą
        </h2>

        {/* Video Container */}
        {videoUrl ? (
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
        ) : (
          <p className="text-gray-500">Vaizdo įrašas kraunasi...</p>
        )}

        {/* CTA Button */}
        <div className="mt-10">
          <Button
            text="See Hundreds of Reviews & Case Studies"
            href="/reviews"
            className="bg-orange-500 text-white text-lg font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
