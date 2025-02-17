import { notFound } from "next/navigation";
import { courseData } from "../../lib/courseData";
import Link from "next/link";

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
    // Option 1: show Next.js's 404 page
    notFound();

    // Option 2: return a custom error component:
    return <div className="container mx-auto p-8">Lesson not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <Link href="/courses" className="text-blue-600 hover:text-blue-800">
          ← Back to Courses
        </Link>

        <div className="mt-6 bg-white p-6 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">{lesson?.title}</h1>
          <p className="text-gray-700 mb-4">{lesson?.description}</p>
          <p className="text-gray-500 mb-6">Duration: {lesson?.duration}</p>

          <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={getEmbedUrl(lesson!.videoUrl)}
              title={lesson?.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>

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
