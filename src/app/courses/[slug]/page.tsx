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
import type { Lesson, CourseSectionData } from "@/types/course";

export default function LessonDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [section, setSection] = useState<CourseSectionData | undefined>();
  const [adjacentLessons, setAdjacentLessons] = useState<{ prevLesson: Lesson | null; nextLesson: Lesson | null }>({
    prevLesson: null,
    nextLesson: null,
  });

  const params = useParams();
  const slug = params.slug as string;

  const { markLessonAsCompleted, isLessonCompleted } = useCourseProgress();
  const lessonComplete = lesson ? isLessonCompleted(slug) : false;

  useEffect(() => {
    async function fetchLessonData() {
      try {
        const [lessonData, sectionData, adjacentData] = await Promise.all([
          getLessonBySlug(slug),
          getSectionByLessonSlug(slug),
          getAdjacentLessons(slug),
        ]);

        if (!lessonData) {
          throw new Error("Lesson not found");
        }

        setLesson(lessonData);
        setSection(sectionData);
        setAdjacentLessons(adjacentData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching lesson data:", err);
        setError(err instanceof Error ? err : new Error("Failed to load lesson"));
        setIsLoading(false);
      }
    }

    fetchLessonData();
  }, [slug]);

  useEffect(() => {
    if (!lesson || !videoReady) return;

    try {
      markLessonAsCompleted(slug);
    } catch (err) {
      console.error("Error marking lesson as completed:", err);
    }
  }, [slug, markLessonAsCompleted, lesson, videoReady]);

  const handleVideoError = (err: Error) => {
    console.error("Video player error:", err);
    setError(err);
    setIsLoading(false);
  };

  if (error) {
    return (
      <div className="bg-[#121212] min-h-screen text-gray-200">
        <div className="sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-gray-800/50">
          <div className="container mx-auto max-w-screen-lg px-4 py-4">
            <BackButton href="/courses" label="Back to Courses Page" />
          </div>
        </div>
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
    );
  }

  if (isLoading || !lesson) {
    return (
      <div className="bg-[#121212] min-h-screen text-gray-200">
        <div className="sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-gray-800/50">
          <div className="container mx-auto max-w-screen-lg px-4 py-4">
            <BackButton href="/courses" label="Back to Courses Page" />
          </div>
        </div>
        <div className="container mx-auto max-w-screen-lg px-4 py-8">
          <div className="mt-6 bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 flex items-center justify-center">
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading lesson content...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const materials = Array.isArray(lesson.materials) ? lesson.materials : [];

  return (
    <div className="bg-[#121212] min-h-screen text-gray-200">
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="container mx-auto max-w-screen-lg px-4 py-4">
          <div className="flex items-center justify-between">
            <BackButton href="/courses" label="Back to Courses Page" />
            {section && (
              <div className="text-sm text-gray-400">
                Section:{" "}
                <span className="font-medium text-orange-500">{section.sectionTitle}</span>
              </div>
            )}
          </div>
        </div>
      </div>

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

            <div className="mb-4 flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  lessonComplete ? "bg-green-500" : "bg-gray-500"
                }`}
              ></div>
              <span className="text-sm text-gray-400">
                {lessonComplete ? "Completed" : "In Progress"}
              </span>
            </div>

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
  );
}
