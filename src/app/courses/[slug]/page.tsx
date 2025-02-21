import { notFound } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import Link from "next/link";
import { courseData } from "@/app/lib/courseData";

interface Lesson {
  slug: string;
  title: string;
  duration: string;
  description: string;
  videoUrl: string;
  completed: boolean;
}

export async function generateStaticParams(): Promise<
  { params: { slug: string } }[]
> {
  return courseData.flatMap((section) =>
    section.lessons.map((lesson) => ({
      params: { slug: lesson.slug },
    }))
  );
}

function getAllLessons(): Lesson[] {
  return courseData.flatMap((section) => section.lessons);
}

function getLessonBySlug(slug: string): Lesson | undefined {
  return getAllLessons().find((lesson) => lesson.slug === slug);
}

function getEmbedUrl(url: string) {
  return url.replace("watch?v=", "embed/");
}

// Notice that the props now have params typed as a Promise
export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params before using them
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return notFound();
  }

  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.slug === slug);

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <div className="bg-gray-100 min-h-screen text-black">
      <div className="container mx-auto max-w-screen-lg px-4 py-8">
        <BackButton href="/courses" label="Back to Courses Page" />

        <div className="mt-6 bg-white p-6 rounded shadow flex flex-col lg:flex-row gap-8">
          {/* Video & Lesson Info */}
          <div className="flex-1">
            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={getEmbedUrl(lesson.videoUrl)}
                title={lesson.title}
                frameBorder="0"
                allowFullScreen
              />
            </div>

            <h1 className="text-3xl font-bold my-4">{lesson.title}</h1>
            <p className="text-gray-500 mb-2">Duration: {lesson.duration}</p>
            <p className="text-gray-700 mb-4">{lesson.description}</p>

            {lesson.completed && (
              <p className="mt-4 text-green-600 font-semibold">
                You have completed this lesson!
              </p>
            )}
          </div>

          {/* Sidebar: Next & Previous Lessons */}
          <aside className="w-full lg:w-80 bg-gray-50 p-4 rounded shadow-sm self-start">
            <h2 className="text-lg font-bold mb-4">Coming Up</h2>
            <div className="flex flex-col gap-2 mb-6">
              {prevLesson && (
                <Link
                  href={`/courses/${prevLesson.slug}`}
                  className="bg-white border border-gray-300 hover:bg-gray-100 text-sm px-4 py-2 rounded"
                >
                  Previous: {prevLesson.title}
                </Link>
              )}
              {nextLesson && (
                <Link
                  href={`/courses/${nextLesson.slug}`}
                  className="bg-white border border-gray-300 hover:bg-gray-100 text-sm px-4 py-2 rounded"
                >
                  Next: {nextLesson.title}
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
