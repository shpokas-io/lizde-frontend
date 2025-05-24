"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import LessonCard from "@/components/common/LessonCard";
import { useCourse } from "@/components/lib/CourseContext";

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

      // Add all other lessons to completion map
      courseData.forEach((section) => {
        section.lessons.forEach((lesson) => {
          completionMap[lesson.slug] = isLessonCompleted(lesson.slug);
        });
      });

      setLessonCompletionMap(completionMap);
    }
  }, [
    courseLoading,
    getProgress,
    courseData,
    
    isLessonCompleted,
  ]);

  if (courseLoading) {
    return <div className="min-h-screen bg-[#1a1a1a] p-4">Loading...</div>;
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
