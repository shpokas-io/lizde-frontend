'use client';

import BackButton from "@/components/common/BackButton";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import { useCourse } from "../lib/CourseContext";

export default function CoursesPage() {
  const { 
    getProgress, 
    getFilteredCourseData, 
    activeFilter, 
    setActiveFilter
  } = useCourse();

  // Get filtered course data based on active filter
  const filteredCourseData = getFilteredCourseData(activeFilter);
  const progress = getProgress();

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4">
        <div className="container mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <BackButton href="/" label="Home" />
            <div className="hidden sm:block h-6 w-px bg-gray-300 mx-4"></div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">My Learning Path</h1>
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

        {/* Filters & Actions Bar */}
        <div className="mt-12 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              className={`px-4 py-2 ${activeFilter === 'all' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} rounded-lg font-medium shadow-sm hover:bg-orange-600 hover:text-white transition-colors`}
              onClick={() => setActiveFilter('all')}
            >
              All Courses
            </button>
            <button 
              className={`px-4 py-2 ${activeFilter === 'in-progress' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} rounded-lg font-medium shadow-sm hover:bg-orange-600 hover:text-white transition-colors`}
              onClick={() => setActiveFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`px-4 py-2 ${activeFilter === 'completed' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border border-gray-200'} rounded-lg font-medium shadow-sm hover:bg-orange-600 hover:text-white transition-colors`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        
        {/* Course Sections */}
        <div className="space-y-8">
          {filteredCourseData.length > 0 ? (
            filteredCourseData.map((section, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden px-6">
                <CourseSection
                  title={section.sectionTitle}
                  lessons={section.lessons}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-700">No courses found</h3>
              <p className="text-gray-500 mt-2">
                {activeFilter === 'in-progress' 
                  ? "You don't have any courses in progress. Start a course to see it here."
                  : "You haven't completed any courses yet. Keep learning!"}
              </p>
            </div>
          )}
        </div>
        
        {/* Pagination - only shown if there are multiple pages */}
        {filteredCourseData.length > 5 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-orange-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-md">1</button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-orange-50">2</button>
              <button className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-orange-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
