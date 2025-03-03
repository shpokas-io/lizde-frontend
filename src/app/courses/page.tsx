"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import LessonCard from "@/components/common/LessonCard";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { courseData, startHereLesson } from "@/services/courseData";
import { LessonWithCompletionStatus } from "@/types/course";

/**
 * Courses page showing all available course sections and lessons with improved error handling
 */
export default function CoursesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const {
    getProgress,
    isLessonCompleted,
    lastAccessedLesson,
    loading: progressLoading,
  } = useCourseProgress();

  // Calculate progress once our data is ready
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    try {
      if (!progressLoading) {
        setProgress(getProgress());
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error calculating progress:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to load course progress")
      );
      setIsLoading(false);
    }
  }, [progressLoading, getProgress]);

  // Prepare the lessons completion data once our progress data is ready
  const [lessonCompletionMap, setLessonCompletionMap] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    try {
      if (!progressLoading) {
        const completionMap: Record<string, boolean> = {};

        // Process the start here lesson
        if (startHereLesson) {
          completionMap[startHereLesson.slug] = isLessonCompleted(
            startHereLesson.slug
          );
        }

        // Process all course sections
        courseData.forEach((section) => {
          section.lessons.forEach((lesson) => {
            completionMap[lesson.slug] = isLessonCompleted(lesson.slug);
          });
        });

        setLessonCompletionMap(completionMap);
      }
    } catch (err) {
      console.error("Error preparing lesson completion data:", err);
    }
  }, [progressLoading, isLessonCompleted]);

  // Prepare the start here lesson with completion status
  const startHereLessonWithStatus: LessonWithCompletionStatus | null =
    startHereLesson
      ? {
          ...startHereLesson,
          completed: lessonCompletionMap[startHereLesson.slug] || false,
        }
      : null;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#292f36] border-r-[#292f36] border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-[#292f36] text-white rounded hover:bg-[#1d2129] transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BackButton href="/" label="Home" />
              <div className="hidden sm:block h-6 w-px bg-gray-300 mx-4"></div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                My Learning Path
              </h1>
            </div>

            {lastAccessedLesson && (
              <a
                href={`/courses/${lastAccessedLesson}`}
                className="text-sm text-[#292f36] hover:text-[#1d2129] flex items-center"
              >
                <span className="mr-2">Continue Learning</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        {/* Course Hero/Header */}
        <CourseHeader
          title="Tavo muzikos karjėra prasideda čia"
          description="Start getting label-quality mixes so you can attract better artists, increase your rates, work on your own terms, and build an awesome career as a mixer."
          imageUrl="/images/about-section.jpg"
          progress={progress}
        />

        {/* Course Sections */}
        <div className="space-y-8 mt-12">
          {/* Startas Section */}
          {startHereLessonWithStatus && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-[#292f36] border-b border-gray-200">
                <h2 className="text-xl font-bold text-white">Startas</h2>
              </div>
              <div className="px-4 py-2">
                <LessonCard lesson={startHereLessonWithStatus} />
              </div>
            </div>
          )}

          {/* Course Sections - Using the reusable component */}
          {courseData.map((section, index) => (
            <CourseSection
              key={section.sectionTitle}
              section={section}
              lessonCompletionMap={lessonCompletionMap}
              headerBgColor={index % 2 === 0 ? "#292f36" : "#26292c"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
