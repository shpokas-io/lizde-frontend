import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LessonWithCompletionStatus } from "@/types/course";
import { PlayIcon, CheckIcon } from "@/components/icons/Index";
import { getYouTubeThumbnail, isYouTubeUrl } from "@/utils/videoUtils";

interface LessonCardProps {
  lesson: LessonWithCompletionStatus;
  className?: string;
}

export default function LessonCard({
  lesson,
  className = "",
}: LessonCardProps) {
  const [thumbnailError, setThumbnailError] = useState(false);

  const thumbnailUrl =
    !thumbnailError && isYouTubeUrl(lesson.videoUrl)
      ? getYouTubeThumbnail(lesson.videoUrl, "hq")
      : lesson.videoThumbnail || "/images/video-placeholder.jpg";

  return (
    <Link href={`/courses/${lesson.slug}`}>
      <div
        className={`flex items-center gap-4 py-4 hover:bg-gray-100 transition-colors rounded-lg px-2 ${className}`}
      >
        <div className="relative min-w-[120px] h-[68px] rounded-md overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={lesson.title}
            width={120}
            height={68}
            className="object-cover h-full w-full"
            onError={() => setThumbnailError(true)}
            priority={false}
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white/80 rounded-full p-1.5 shadow-sm">
              <PlayIcon className="h-4 w-4 text-[#292f36]" />
            </div>
          </div>
        </div>

        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-gray-800 truncate">{lesson.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {lesson.description.split(". ")[0]}...
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {lesson.completed ? (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <CheckIcon className="text-white" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
