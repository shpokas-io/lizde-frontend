import { notFound } from "next/navigation";
import { courseData } from "../../lib/courseData";
import BackButton from "@/components/common/BackButton";

// Helper function to flatten all lessons from all sections
function getAllLessons() {
  return courseData.flatMap((section) => section.lessons);
}

function getLessonBySlug(slug: string) {
  return getAllLessons().find((lesson) => lesson.slug === slug);
}

// Convert YouTube URL to an embed URL
function getEmbedUrl(url: string) {
  return url.replace("watch?v=", "embed/");
}

export default function LessonDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
    // or: return <div className="container mx-auto p-8">Lesson not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        {/* Updated Back Button usage */}
        <BackButton href="/courses" label="Back to Courses Page" />

        <div className="mt-6 bg-white p-6 rounded shadow">
          {/* 1. Video first */}
          <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getEmbedUrl(lesson!.videoUrl)}
              title={lesson?.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>

          {/* 2. Lesson title, duration, description after the video */}
          <h1 className="text-3xl font-bold my-4">{lesson?.title}</h1>
          <p className="text-gray-500 mb-2">Duration: {lesson?.duration}</p>
          <p className="text-gray-700 mb-4">{lesson?.description}</p>

          {lesson?.completed && (
            <p className="mt-4 text-green-600 font-semibold">
              You have completed this lesson!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
