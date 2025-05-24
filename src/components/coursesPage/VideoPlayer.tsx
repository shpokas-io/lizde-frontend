import { useState, useEffect, useRef } from "react";
import {
  getEmbedUrl,
  isYouTubeUrl,
  getYouTubeId,
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
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const playerId = useRef(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    if (!isYouTubeUrl(videoUrl)) {
      setError(new Error("Unsupported video URL format"));
      setIsLoading(false);
      return;
    }
    const videoId = getYouTubeId(videoUrl);
    if (!videoId) {
      setError(new Error("Invalid YouTube video URL"));
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  }, [videoUrl]);

  if (isLoading) {
    return (
      <div className={`relative w-full h-0 pb-[56.25%] bg-gray-200 rounded-lg ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-16 h-16 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative w-full h-0 pb-[56.25%] bg-red-100 rounded-lg ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="text-red-500 font-medium mb-2">Error loading video</div>
          <div className="text-red-400 text-sm text-center">{error.message}</div>
        </div>
      </div>
    );
  }

  // Render a simple YouTube iframe
  return (
    <div className={`relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg ${className}`}>
      <iframe
        id={playerId.current}
        className="absolute top-0 left-0 w-full h-full"
        src={getEmbedUrl(videoUrl)}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
