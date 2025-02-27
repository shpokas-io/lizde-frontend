"use client";

import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import { useCourse } from "../lib/CourseContext";
import { courseData } from "../lib/courseData";
import CourseLesson from "@/components/coursesPage/CourseLesson";

export default function CoursesPage() {
  const { getProgress, isLessonCompleted } = useCourse();
  const progress = getProgress();

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
              <CourseLesson
                lesson={{
                  slug: "start-here",
                  title: "Start Here!",
                  duration: "3 minutes",
                  description:
                    "Welcome to the course! You've taken a big step in making this investment...",
                  videoThumbnail: "/images/about-section.jpg",
                  videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
                  completed: isLessonCompleted("start-here"),
                }}
              />
            </div>
          </div>

          {/* Pirma savaitė */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Pirma savaitė</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {courseData[0].lessons.map((lesson) => (
                <div key={lesson.slug} className="px-4 py-2">
                  <CourseLesson
                    lesson={{
                      ...lesson,
                      completed: isLessonCompleted(lesson.slug),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Antra savaitė */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Antra savaitė</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {courseData[1].lessons.map((lesson) => (
                <div key={lesson.slug} className="px-4 py-2">
                  <CourseLesson
                    lesson={{
                      ...lesson,
                      completed: isLessonCompleted(lesson.slug),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Trečia savaitė */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Trečia savaitė
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {courseData[2].lessons.map((lesson) => (
                <div key={lesson.slug} className="px-4 py-2">
                  <CourseLesson
                    lesson={{
                      ...lesson,
                      completed: isLessonCompleted(lesson.slug),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
