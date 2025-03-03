/**
 * Enhanced video player component with error handling and loading states
 */
"use client";

import { useState, useEffect } from "react";
import { getEmbedUrl, isValidVideoUrl } from "@/utils/videoUtils";

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

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate the URL first
      if (!videoUrl || !isValidVideoUrl(videoUrl)) {
        throw new Error("Invalid or unsupported video URL");
      }

      // Get the embed URL
      const url = getEmbedUrl(videoUrl);
      setEmbedUrl(url);
      setIsLoading(false);

      // Call the onReady callback if provided
      if (onReady) {
        onReady();
      }
    } catch (err) {
      console.error("Error setting up video player:", err);
      setError(
        err instanceof Error ? err : new Error("Unknown error loading video")
      );
      setIsLoading(false);

      // Call the onError callback if provided
      if (onError && err instanceof Error) {
        onError(err);
      }
    }
  }, [videoUrl, onReady, onError]);

  // Show loading state
  if (isLoading) {
    return (
      <div
        className={`relative w-full h-0 pb-[56.25%] bg-gray-200 animate-pulse rounded-lg ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Loading video...</div>
        </div>
      </div>
    );
  }

  // Show error state
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

  // Regular video player
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
