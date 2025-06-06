import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";
import { Lesson } from "@/types/course";
import { getYouTubeThumbnail, extractYouTubeVideoId } from "@/utils/videoUtils";

interface LessonNavigationProps {
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  className?: string;
}

export default function LessonNavigation({
  prevLesson,
  nextLesson,
  className = "",
}: LessonNavigationProps) {
  return (
    <div
      className={`bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 shadow-sm ${className}`}
    >
      <h2 className="text-lg font-bold mb-4 flex items-center border-b border-gray-800 pb-3 text-white">
        Coming Up
      </h2>
      <div className="flex flex-col gap-3">
        {prevLesson && (
          <Link
            href={`/courses/${prevLesson.slug}`}
            className="group flex items-center bg-[#232323] hover:bg-[#2a2a2a] px-3 py-2 rounded-md border border-gray-800 transition-all"
          >
            <div className="flex items-center justify-center bg-[#1a1a1a] rounded-full w-8 h-8 mr-3 group-hover:bg-orange-500/10 transition-colors">
              <FaArrowLeft className="h-3 w-3 text-gray-400 group-hover:text-orange-500" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs text-gray-500 font-medium">
                Previous Lesson
              </div>
              <div className="text-sm font-medium text-gray-300 group-hover:text-orange-500 whitespace-nowrap overflow-hidden text-ellipsis">
                {prevLesson.title}
              </div>
            </div>
          </Link>
        )}

        {nextLesson && (
          <Link
            href={`/courses/${nextLesson.slug}`}
            className="group block bg-[#232323] hover:bg-[#2a2a2a] rounded-md border border-gray-800 overflow-hidden transition-all"
          >
            <div className="relative">
              <Image
                src={getYouTubeThumbnail(extractYouTubeVideoId(nextLesson.videoUrl)!)}
                alt={nextLesson.title}
                width={320}
                height={180}
                className="w-full h-36 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black bg-opacity-70 w-10 h-10 flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all">
                  <FaPlay className="h-3 w-3 text-white ml-1" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs text-orange-500 font-medium uppercase tracking-wide mb-1">
                Next Up
              </div>
              <div className="font-medium text-gray-300 group-hover:text-orange-500">
                {nextLesson.title}
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <FaArrowRight className="text-xs text-orange-500 mr-1" />
                <span>Į kursą</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
