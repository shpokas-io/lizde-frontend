"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import CoursesNavBar from "@/components/coursesPage/CoursesNavBar";
import VideoPlayer from "@/components/coursesPage/VideoPlayer";
import LessonNavigation from "@/components/coursesPage/LessonNavigation";
import LessonMaterials from "@/components/coursesPage/LessonMaterials";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { getLessonBySlug, getAdjacentLessons } from "@/utils/courseUtils";
import { useCourse } from "@/contexts/CourseContext";
import type { Lesson } from "@/types/course";

export default function LessonDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [adjacentLessons, setAdjacentLessons] = useState<{ prevLesson: Lesson | null; nextLesson: Lesson | null }>({
    prevLesson: null,
    nextLesson: null,
  });

  const { courseData } = useCourse();
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (courseData.length === 0) return;

    try {
      const lessonData = getLessonBySlug(courseData, slug);
      const adjacentData = getAdjacentLessons(courseData, slug);

      if (!lessonData) {
        throw new Error("Lesson not found");
      }

      setLesson(lessonData);
      setAdjacentLessons({
        prevLesson: adjacentData.previousLesson,
        nextLesson: adjacentData.nextLesson,
      });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load lesson"));
      setIsLoading(false);
    }
  }, [courseData, slug]);

  const handleVideoError = (err: Error) => {
    setError(err);
    setIsLoading(false);
  };

  if (error) {
    return (
      <ProtectedRoute>
        <div className="bg-[#121212] min-h-screen text-gray-200">
          <CoursesNavBar backHref="/courses" backLabel="Back to Courses Page" />
          <div className="container mx-auto max-w-screen-lg px-4 py-8">
            <div className="mt-6 bg-[#1a1a1a] p-4 rounded-lg border border-red-500/50 text-red-400">
              <h2 className="text-lg font-medium mb-2">Error Loading Lesson</h2>
              <p>{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (isLoading || !lesson) {
    return (
      <ProtectedRoute>
        <div className="bg-[#121212] min-h-screen text-gray-200">
          <CoursesNavBar backHref="/courses" backLabel="Back to Courses Page" />
          <div className="container mx-auto max-w-screen-lg px-4 py-8">
            <div className="mt-6 bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 flex items-center justify-center">
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Loading lesson content...</p>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const materials = Array.isArray(lesson.materials) ? lesson.materials : [];

  return (
    <ProtectedRoute>
      <div className="bg-[#121212] min-h-screen text-gray-200">
        <CoursesNavBar backHref="/courses" backLabel="Atgal" />

        <div className="container mx-auto max-w-screen-lg px-4 py-8">
          <div className="mt-6 bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <VideoPlayer
                videoUrl={lesson.videoUrl}
                title={lesson.title}
                onReady={() => setVideoReady(true)}
                onError={handleVideoError}
              />

              <h1 className="text-3xl font-bold mt-6 mb-3 text-white">{lesson.title}</h1>
              <div className="h-1 w-20 bg-orange-500 rounded mb-6"></div>

              <div className="bg-[#232323] p-5 rounded-lg border border-gray-800 shadow-sm">
                <p className="text-gray-300 leading-relaxed">
                  {lesson.description}
                </p>
              </div>
            </div>

            <aside className="w-full lg:w-80 self-start space-y-8">
              <LessonNavigation
                prevLesson={adjacentLessons.prevLesson}
                nextLesson={adjacentLessons.nextLesson}
              />

              {materials.length > 0 && (
                <LessonMaterials materials={materials} />
              )}
            </aside>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
