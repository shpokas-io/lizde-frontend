'use client';

import { notFound, useParams } from "next/navigation";
import { useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import VideoPlayer from "@/components/coursesPage/VideoPlayer";
import LessonNavigation from "@/components/coursesPage/LessonNavigation";
import LessonMaterials from "@/components/coursesPage/LessonMaterials";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { getLessonBySlug, getAdjacentLessons } from "@/utils/courseUtils";
import { Material } from "@/types/course";

/**
 * Lesson detail page component displaying a specific lesson
 */
export default function LessonDetailPage() {
  // Get the slug from the URL params
  const params = useParams();
  const slug = params.slug as string;
  
  // Get lesson and course progress
  const lesson = getLessonBySlug(slug);
  const { markLessonAsCompleted } = useCourseProgress();
  
  // Get previous and next lessons for navigation
  const { prevLesson, nextLesson } = getAdjacentLessons(slug);

  // Mark lesson as completed when it's viewed
  useEffect(() => {
    if (!lesson) return;
    markLessonAsCompleted(slug);
  }, [slug, markLessonAsCompleted, lesson]);

  if (!lesson) {
    return notFound();
  }

  // Process materials - ensure we're working with an array of Material objects
  const materials = Array.isArray(lesson.materials) 
    ? lesson.materials 
    : [];

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <BackButton href="/courses" label="Back to Courses Page" />

        <div className="mt-6 bg-white p-6 rounded shadow flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Video Player Component */}
            <VideoPlayer 
              videoUrl={lesson.videoUrl} 
              title={lesson.title} 
            />

            <h1 className="text-3xl font-bold my-4">{lesson.title}</h1>
            <p className="text-gray-700 mb-4">{lesson.description}</p>
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
              <LessonMaterials materials={materials as Material[]} />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}