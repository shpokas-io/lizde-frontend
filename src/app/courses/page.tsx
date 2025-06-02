"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import { useCourse } from "@/contexts/CourseContext";
import { prefetchLesson } from "@/services/courseService";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function CoursesPage() {
  const {
    courseData,
    loading: courseLoading,
    error: courseError,
  } = useCourse();

  useEffect(() => {
    if (!courseLoading) {
      // Prefetch the next few lessons for faster navigation
      courseData.forEach((section) => {
        section.lessons.forEach((lesson) => {
          prefetchLesson(lesson.slug);
        });
      });
    }
  }, [courseLoading, courseData]);

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
    <ProtectedRoute>
      <div className="min-h-screen bg-[#1a1a1a] p-4">
        <div className="max-w-4xl mx-auto">
          <BackButton href="/" label="Atgal" className="mb-12" />
          <CourseHeader
            title="DIY dainų įrašymo pagrindai"
            description="Šis kursas – tai praktinis gidas, kaip namų sąlygomis įrašyti, suvesti ir apdoroti muzikinį kūrinį nuo pradžios iki pabaigos, naudojant prieinamą įrangą ir garso apdorojimo įrankius."
            imageUrl="/images/about-section.jpg"
            className="mb-12"
          />

          {courseData.map((section) => (
            <div key={section.sectionTitle} className="mb-8">
              <CourseSection section={section} />
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
