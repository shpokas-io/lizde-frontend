"use client";

import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import LessonCard from "@/components/common/LessonCard";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { courseData, startHereLesson } from "@/services/courseData";
import { LessonWithCompletionStatus } from "@/types/course";

/**
 * Courses page showing all available course sections and lessons
 */
export default function CoursesPage() {
  const { getProgress, isLessonCompleted } = useCourseProgress();
  const progress = getProgress();
  
  // Create a completion status map for quick lesson status lookup
  const lessonCompletionMap: Record<string, boolean> = {};
  courseData.forEach(section => {
    section.lessons.forEach(lesson => {
      lessonCompletionMap[lesson.slug] = isLessonCompleted(lesson.slug);
    });
  });
  
  // Prepare the start here lesson with completion status
  const startHereLessonWithStatus: LessonWithCompletionStatus = {
    ...startHereLesson,
    completed: isLessonCompleted(startHereLesson.slug)
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <BackButton href="/" label="Home" />
            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-4"></div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              My Learning Path
            </h1>
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Startas</h2>
            </div>
            <div className="px-4 py-2">
              <LessonCard lesson={startHereLessonWithStatus} />
            </div>
          </div>

          {/* Course Sections - Using the reusable component */}
          {courseData.map((section) => (
            <CourseSection 
              key={section.sectionTitle} 
              section={section}
              lessonCompletionMap={lessonCompletionMap}
            />
          ))}
        </div>
      </div>
    </div>
  );
}