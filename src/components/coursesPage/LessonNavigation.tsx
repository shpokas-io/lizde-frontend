import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";
import { Lesson } from "@/types/course";
import { getYouTubeThumbnail } from "@/utils/videoUtils";

interface LessonNavigationProps {
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  className?: string;
}

/**
 * Component for navigating between lessons
 */
export default function LessonNavigation({
  prevLesson,
  nextLesson,
  className = "",
}: LessonNavigationProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}
    >
      <h2 className="text-lg font-bold mb-4 flex items-center border-b border-gray-100 pb-3">
        <span className="bg-[#292f36]/10 text-[#292f36] rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
          <FaArrowRight className="text-xs" />
        </span>
        Coming Up
      </h2>
      <div className="flex flex-col gap-3">
        {prevLesson && (
          <Link
            href={`/courses/${prevLesson.slug}`}
            className="group flex items-center bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md border border-gray-200 transition-all"
          >
            <div className="flex items-center justify-center bg-gray-200 rounded-full w-8 h-8 mr-3 group-hover:bg-[#292f36]/10 transition-colors">
              <FaArrowLeft className="h-3 w-3 text-gray-500 group-hover:text-[#292f36]" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs text-gray-500 font-medium">
                Previous Lesson
              </div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-[#292f36] whitespace-nowrap overflow-hidden text-ellipsis">
                {prevLesson.title}
              </div>
            </div>
          </Link>
        )}

        {nextLesson && (
          <Link
            href={`/courses/${nextLesson.slug}`}
            className="group block bg-white hover:bg-[#292f36]/5 rounded-md border border-gray-200 overflow-hidden transition-all"
          >
            <div className="relative">
              <Image
                src={getYouTubeThumbnail(nextLesson.videoUrl)}
                alt={nextLesson.title}
                width={320}
                height={180}
                className="w-full h-36 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-black bg-opacity-70 w-10 h-10 flex items-center justify-center group-hover:bg-[#292f36] group-hover:scale-110 transition-all">
                  <FaPlay className="h-3 w-3 text-white ml-1" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs text-[#292f36] font-medium uppercase tracking-wide mb-1">
                Next Up
              </div>
              <div className="font-medium text-gray-800 group-hover:text-[#1d2129]">
                {nextLesson.title}
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <FaArrowRight className="text-xs text-[#292f36] mr-1" />
                <span>Continue learning</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
