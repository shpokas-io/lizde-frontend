"use client";

import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import LessonCard from "@/components/common/LessonCard";
import { useCourse } from "@/components/lib/CourseContext";
import { useAuth } from "@/contexts/AuthContext";
import LockedContent from "@/components/LockedContent";

export default function CoursesPage() {
  const { user, loading: authLoading } = useAuth();
  const {
    courseData,
    startHereLesson,
    getProgress,
    isLessonCompleted,
    loading: courseLoading,
    error: courseError,
  } = useCourse();

  const [progress, setProgress] = useState(0);
  const [lessonCompletionMap, setLessonCompletionMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!courseLoading && !authLoading) {
      setProgress(getProgress());
      const completionMap: Record<string, boolean> = {};
      
      // Add start here lesson to completion map
      if (startHereLesson) {
        completionMap[startHereLesson.slug] = isLessonCompleted(startHereLesson.slug);
      }

      // Add all other lessons to completion map
      courseData.forEach(section => {
        section.lessons.forEach(lesson => {
          completionMap[lesson.slug] = isLessonCompleted(lesson.slug);
        });
      });

      setLessonCompletionMap(completionMap);
    }
  }, [courseLoading, authLoading, getProgress, courseData, startHereLesson, isLessonCompleted]);

  if (courseLoading || authLoading) {
    return <div className="min-h-screen bg-[#1a1a1a] p-4">Loading...</div>;
  }

  if (courseError) {
    return <div className="min-h-screen bg-[#1a1a1a] p-4 text-red-500">Error: {courseError.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4">
      <div className="max-w-4xl mx-auto">
        <BackButton href="/" label="Home" />
        <CourseHeader 
          title="Tavo muzikos karjėra prasideda čia"
          description="Start getting label-quality mixes so you can attract better artists, increase your rates, work on your own terms, and build an awesome career as a mixer."
          imageUrl="/images/about-section.jpg"
          progress={progress}
        />

        {(!user || !user.hasCourseAccess) && (
          <LockedContent
            title="Course Locked"
            description={user ? "Please purchase the course to access the content." : "Please sign in to access the course content."}
            isAuthenticated={!!user}
          />
        )}

        {user && user.hasCourseAccess && (
          <>
            {startHereLesson && (
              <div className="mb-8">
                <CourseSection
                  section={{
                    sectionTitle: "Start Here",
                    lessons: [startHereLesson],
                  }}
                  lessonCompletionMap={lessonCompletionMap}
                  headerBgColor="bg-blue-500/10"
                />
              </div>
            )}

            {courseData.map((section, index) => (
              <div key={section.sectionTitle} className="mb-8">
                <CourseSection
                  section={section}
                  lessonCompletionMap={lessonCompletionMap}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
