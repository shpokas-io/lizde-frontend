import BackButton from "@/components/reusable/BackButton";
import CourseHeader from "@/components/reusable/courses/CourseHeader";
import CourseSection from "@/components/reusable/courses/CourseSection";
import Footer from "@/components/reusable/courses/Footer";

export default function CoursesPage() {
  return (
    <div className="bg-gray-100 text-black">
      {/* Back Button */}
      <div className="container mx-auto max-w-screen-lg px-4 py-6">
        <BackButton href="/" />
      </div>

      {/* Course Header */}
      <div className="container mx-auto max-w-screen-lg px-4 pb-8">
        <CourseHeader
          title="Hardcore Mixing"
          description="Start getting label-quality mixes so you can attract better artists, increase your rates, work on your own terms, and build an awesome career as a mixer."
          imageUrl="/images/about-section.jpg"
          progress={60} // Percentage of course completed
        />
      </div>

      {/* Course Sections */}
      <div className="container mx-auto max-w-screen-lg px-4 py-8 space-y-12">
        <CourseSection
          title="Part 1: Mindset"
          lessons={[
            {
              title: "Start Here!",
              duration: "3 minutes",
              description:
                "Welcome to the course! You've taken a big step in making this investment...",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Your Mixing Mindset",
              duration: "10 minutes",
              description:
                "The first step in the M3 Method for Massive Mixes is getting your mindset right...",
              videoThumbnail: "/images/about-section.jpg",
              completed: false,
            },
          ]}
        />
        <CourseSection
          title="Part 2: Management"
          lessons={[
            {
              title: "Managing Your Mix Session",
              duration: "15 minutes",
              description:
                "Part 2 of the M3 Method for Massive Mixes is Management...",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Organization and Routing",
              duration: "9 minutes",
              description:
                "Video walkthrough of the organization and routing setup...",
              videoThumbnail: "/images/about-section.jpg",
              completed: false,
            },
          ]}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
