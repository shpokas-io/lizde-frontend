"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import { useCourse } from "@/components/lib/CourseContext";
import { prefetchLesson } from "@/services/courseService";

export default function CoursesPage() {
  const {
    courseData,
    getProgress,
    isLessonCompleted,
    loading: courseLoading,
    error: courseError,
  } = useCourse();

  const [progress, setProgress] = useState(0);
  const [lessonCompletionMap, setLessonCompletionMap] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (!courseLoading) {
      setProgress(getProgress());
      const completionMap: Record<string, boolean> = {};

      // Add all other lessons to completion map and prefetch them
      courseData.forEach((section) => {
        section.lessons.forEach((lesson) => {
          completionMap[lesson.slug] = isLessonCompleted(lesson.slug);
          // Prefetch the next few lessons for faster navigation
          prefetchLesson(lesson.slug);
        });
      });

      setLessonCompletionMap(completionMap);
    }
  }, [courseLoading, getProgress, courseData, isLessonCompleted]);

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-4 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-56 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (courseError) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-4 text-red-500">
        Error: {courseError.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4">
      <div className="max-w-4xl mx-auto">
        <BackButton href="/" label="Atgal" />
        <CourseHeader
          title="DIY dainų įrašymo pagrindai"
          description="Šis kursas – tai praktinis gidas, kaip namų sąlygomis įrašyti, suvesti ir apdoroti muzikinį kūrinį nuo pradžios iki pabaigos, naudojant prieinamą įrangą ir garso apdorojimo įrankius."
          imageUrl="/images/about-section.jpg"
          progress={progress}
        />

        {courseData.map((section, index) => (
          <div key={section.sectionTitle} className="mb-8">
            <CourseSection
              section={section}
              lessonCompletionMap={lessonCompletionMap}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
