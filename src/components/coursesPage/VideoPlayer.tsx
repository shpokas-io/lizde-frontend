import { getEmbedUrl } from "@/utils/videoUtils";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  className?: string;
}

/**
 * Reusable video player component that embeds videos
 */
export default function VideoPlayer({ videoUrl, title, className = "" }: VideoPlayerProps) {
  return (
    <div className={`relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg ${className}`}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={getEmbedUrl(videoUrl)}
        title={title}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}