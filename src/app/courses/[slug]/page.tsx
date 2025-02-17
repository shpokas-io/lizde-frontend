import { notFound } from "next/navigation";
import { courseData } from "../../lib/courseData";
import BackButton from "@/components/common/BackButton";
import Link from "next/link";

function getAllLessons() {
  return courseData.flatMap((section) => section.lessons);
}

// Find a single lesson by its slug
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
  }

  // Flattened array of all lessons
  const allLessons = getAllLessons();
  // Current lesson index in that array
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);

  // Identify the previous and next lessons (if they exist)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <BackButton href="/courses" label="Back to Courses Page" />

        {/* 
          We'll use a responsive flex layout:
          - On large screens: side-by-side
          - On mobile/tablet: stacked
        */}
        <div className="mt-6 bg-white p-6 rounded shadow flex flex-col lg:flex-row gap-8">
          {/* Main Content (Video + Lesson Info) */}
          <div className="flex-1">
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getEmbedUrl(lesson!.videoUrl)}
                title={lesson?.title}
                frameBorder="0"
                allowFullScreen
              />
            </div>

            <h1 className="text-3xl font-bold my-4">{lesson?.title}</h1>
            <p className="text-gray-500 mb-2">Duration: {lesson?.duration}</p>
            <p className="text-gray-700 mb-4">{lesson?.description}</p>

            {lesson?.completed && (
              <p className="mt-4 text-green-600 font-semibold">
                You have completed this lesson!
              </p>
            )}
          </div>

          {/* Sidebar / Next-Lesson Section */}
          <aside className="w-full lg:w-80 bg-gray-50 p-4 rounded shadow-sm self-start">
            <h2 className="text-lg font-bold mb-4">Coming Up</h2>

            <div className="flex flex-col gap-2 mb-6">
              {/* Previous lesson link (if it exists) */}
              {prevLesson && (
                <Link
                  href={`/courses/${prevLesson.slug}`}
                  className="bg-white border border-gray-300 
                             hover:bg-gray-100 text-sm px-4 py-2 rounded"
                >
                  Previous: {prevLesson.title}
                </Link>
              )}
              {/* Next lesson link (if it exists) */}
              {nextLesson && (
                <Link
                  href={`/courses/${nextLesson.slug}`}
                  className="bg-white border border-gray-300 
                             hover:bg-gray-100 text-sm px-4 py-2 rounded"
                >
                  Next: {nextLesson.title}
                </Link>
              )}
            </div>

            {/* Example Downloads Section */}
            <div>
              <h3 className="text-md font-semibold mb-2">Downloads</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    M3 Method for Massive Mixes - Full Manual
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Download Multitracks
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Download Stems
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
