import BackButton from "@/components/common/BackButton";
import SearchBar from "@/components/common/SearchBar";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import { courseData } from "../lib/courseData";

export default function CoursesPage() {
  return (
    <div className="bg-gray-100 text-black">
      {/* Header Row */}
      <div className="container mx-auto max-w-screen-lg px-4 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <BackButton href="/" />
        <div className="mt-4 sm:mt-0">
          <SearchBar />
        </div>
      </div>

      {/* Course Header */}
      <div className="container mx-auto max-w-screen-lg px-4 pb-8">
        <CourseHeader
          title="Tavo muzikos karjėra prasideda čia"
          description="Start getting label-quality mixes so you can attract better artists, increase your rates, work on your own terms, and build an awesome career as a mixer."
          imageUrl="/images/about-section.jpg"
          progress={60}
        />
      </div>

      {/* Course Sections */}
      <div className="container mx-auto max-w-screen-lg px-4 py-8 space-y-12">
        {courseData.map((section, idx) => (
          <CourseSection
            key={idx}
            title={section.sectionTitle}
            lessons={section.lessons}
          />
        ))}
      </div>
    </div>
  );
}
