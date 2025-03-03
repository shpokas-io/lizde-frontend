"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import VideoPlayer from "@/components/coursesPage/VideoPlayer";
import LessonNavigation from "@/components/coursesPage/LessonNavigation";
import LessonMaterials from "@/components/coursesPage/LessonMaterials";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import {
  getLessonBySlug,
  getAdjacentLessons,
  getSectionByLessonSlug,
} from "@/utils/courseUtils";

/**
 * Lesson detail page component displaying a specific lesson with improved error handling
 */
export default function LessonDetailPage() {
  // Component state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Get the slug from the URL params
  const params = useParams();
  const slug = params.slug as string;

  // Get lesson and course progress
  const lesson = getLessonBySlug(slug);
  const section = getSectionByLessonSlug(slug);
  const { markLessonAsCompleted, isLessonCompleted } = useCourseProgress();
  const lessonComplete = lesson ? isLessonCompleted(slug) : false;

  // Get previous and next lessons for navigation
  const { prevLesson, nextLesson } = getAdjacentLessons(slug);

  // Add a loading timeout to prevent infinite loading state
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      // If still loading after 5 seconds, force exit loading state
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  // Set loading to false when we have the lesson data
  useEffect(() => {
    if (lesson) {
      // Add a small delay to prevent flash of loading state
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [lesson]);

  // Mark lesson as completed when video is ready
  useEffect(() => {
    if (!lesson || !videoReady) return;

    try {
      markLessonAsCompleted(slug);
    } catch (err) {
      console.error("Error marking lesson as completed:", err);
    }
  }, [slug, markLessonAsCompleted, lesson, videoReady]);

  // Handle video errors
  const handleVideoError = (err: Error) => {
    console.error("Video player error:", err);
    setError(err);
    setIsLoading(false);
  };

  // Handle 404
  if (!lesson) {
    return notFound();
  }

  // Process materials - ensure we're working with an array of Material objects
  const materials = Array.isArray(lesson.materials) ? lesson.materials : [];

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <div className="flex items-center justify-between">
          <BackButton href="/courses" label="Back to Courses Page" />
          {section && (
            <div className="text-sm text-gray-600">
              Section:{" "}
              <span className="font-medium">{section.sectionTitle}</span>
            </div>
          )}
        </div>

        {error ? (
          <div className="mt-6 bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
            <h2 className="text-lg font-medium mb-2">Error Loading Lesson</h2>
            <p>{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="mt-6 bg-white p-6 rounded shadow flex items-center justify-center">
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-t-[#292f36] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading lesson content...</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 bg-white p-6 rounded shadow flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {/* Video Player Component with error handling */}
              <VideoPlayer
                videoUrl={lesson.videoUrl}
                title={lesson.title}
                onReady={() => setVideoReady(true)}
                onError={handleVideoError}
              />

              <h1 className="text-3xl font-bold mt-6 mb-3">{lesson.title}</h1>
              <div className="h-1 w-20 bg-[#292f36] rounded mb-6"></div>

              {/* Lesson status indicator */}
              <div className="mb-4 flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    lessonComplete ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <span className="text-sm text-gray-600">
                  {lessonComplete ? "Completed" : "In Progress"}
                </span>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-gray-700 leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            </div>

            {/* Right Aside */}
            <aside className="w-full lg:w-80 self-start space-y-8">
              {/* Lesson Navigation Component */}
              <LessonNavigation
                prevLesson={prevLesson}
                nextLesson={nextLesson}
              />

              {/* Lesson Materials Component */}
              {materials.length > 0 && (
                <LessonMaterials materials={materials} />
              )}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
