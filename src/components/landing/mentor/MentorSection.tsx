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

  // Function to convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => url.replace("watch?v=", "embed/");

  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl text-black font-bold mb-8">
          A word from Lizde Mentors
        </h2>

        {/* Show video if fetched, otherwise show loading */}
        {videoUrl ? (
          <div className="flex justify-center">
            <div className="relative w-full h-0 pb-[56.25%] max-w-screen-lg md:max-w-4xl bg-black rounded-lg overflow-hidden shadow-lg">
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
          <p className="text-gray-500">Loading video...</p>
        )}

        {/* CTA Button */}
        <div className="mt-10">
          <Button text="See Can you improve" href="/reviews" />
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
