"use client";

import Link from "next/link";
import Image from "next/image";
import { Lesson } from "@/app/lib/courseData";

interface CourseLessonProps {
  lesson: Lesson;
}

export default function CourseLesson({ lesson }: CourseLessonProps) {
  return (
    <Link href={`/courses/${lesson.slug}`}>
      <div className="flex items-center gap-4 py-4 hover:bg-orange-50 transition-colors rounded-lg px-2">
        {/* Left side - thumbnail and play button */}
        <div className="relative min-w-[120px] h-[68px] rounded-md overflow-hidden">
          <Image
            src={lesson.videoThumbnail}
            alt={lesson.title}
            width={120}
            height={68}
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-orange-500 rounded-full p-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Middle - title and description */}
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{lesson.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-1">
            {lesson.description}
          </p>
        </div>

        {/* Right side - duration and completion status */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {lesson.duration}
          </span>

          {lesson.completed ? (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
