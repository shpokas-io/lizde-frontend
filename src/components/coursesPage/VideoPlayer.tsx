import { useState, useEffect } from "react";
import {
  getEmbedUrl,
  getYouTubeThumbnail,
  isYouTubeUrl,
} from "@/utils/videoUtils";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  className?: string;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export default function VideoPlayer({
  videoUrl,
  title,
  className = "",
  onReady,
  onError,
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [embedUrl, setEmbedUrl] = useState("");

  const thumbnailUrl = isYouTubeUrl(videoUrl)
    ? getYouTubeThumbnail(videoUrl, "maxres")
    : "/images/video-placeholder.jpg";

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      if (!videoUrl) {
        throw new Error("No video URL provided");
      }

      if (!isYouTubeUrl(videoUrl)) {
        throw new Error("Unsupported video URL format");
      }

      const url = getEmbedUrl(videoUrl);
      setEmbedUrl(url);
      setIsLoading(false);

      if (onReady) {
        onReady();
      }
    } catch (err) {
      console.error("Error setting up video player:", err);
      setError(
        err instanceof Error ? err : new Error("Unknown error loading video")
      );
      setIsLoading(false);

      if (onError && err instanceof Error) {
        onError(err);
      }
    }
  }, [videoUrl, onReady, onError]);

  if (isLoading) {
    return (
      <div
        className={`relative w-full h-0 pb-[56.25%] bg-gray-200 rounded-lg ${className}`}
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-16 h-16 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`relative w-full h-0 pb-[56.25%] bg-red-100 rounded-lg ${className}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="text-red-500 font-medium mb-2">
            Error loading video
          </div>
          <div className="text-red-400 text-sm text-center">
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg ${className}`}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
