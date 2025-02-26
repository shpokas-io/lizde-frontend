import { notFound } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import Link from "next/link";
import Image from "next/image";
import { courseData } from "@/app/lib/courseData";
import { FaFileDownload, FaFilePdf, FaFileAlt, FaFile, FaArrowRight, FaArrowLeft, FaPlay } from "react-icons/fa";

// Import the Lesson type directly from courseData
import type { Lesson } from "@/app/lib/courseData";

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

function getYouTubeId(url: string): string {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

          {/* Right Aside */}
          <aside className="w-full lg:w-80 self-start">
            {/* Coming Up Box */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center border-b border-gray-100 pb-3">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
                  <FaArrowRight className="text-xs" />
                </span>
                Coming Up
              </h2>
              <div className="flex flex-col gap-3">
                {prevLesson && (
                  <Link
                    href={`/courses/${prevLesson.slug}`}
                    className="group flex items-center bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md border border-gray-200 transition-all"
                  >
                    <div className="flex items-center justify-center bg-gray-200 rounded-full w-8 h-8 mr-3 group-hover:bg-blue-100 transition-colors">
                      <FaArrowLeft className="h-3 w-3 text-gray-500 group-hover:text-blue-600" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs text-gray-500 font-medium">Previous Lesson</div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 whitespace-nowrap overflow-hidden text-ellipsis">
                        {prevLesson.title}
                      </div>
                    </div>
                  </Link>
                )}
                
                {nextLesson && (
                  <Link
                    href={`/courses/${nextLesson.slug}`}
                    className="group block bg-white hover:bg-blue-50 rounded-md border border-gray-200 overflow-hidden transition-all"
                  >
                    <div className="relative">
                      <Image
                        src={getYouTubeThumbnail(nextLesson.videoUrl)}
                        alt={nextLesson.title}
                        width={320}
                        height={180}
                        className="w-full h-36 object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-black bg-opacity-70 w-10 h-10 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                          <FaPlay className="h-3 w-3 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                        {nextLesson.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">Next Up</div>
                      <div className="font-medium text-gray-800 group-hover:text-blue-700">
                        {nextLesson.title}
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <FaArrowRight className="text-xs text-blue-500 mr-1" />
                        <span>Continue learning</span>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Coming Up section ends here */}

            {/* Downloadable Materials - Separate box */}
            {lesson.materials && Array.isArray(lesson.materials) && lesson.materials.length > 0 && (
              <div className="mt-8 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-4">
                  <FaFileDownload className="text-blue-600 mr-2 text-xl" />
                  <h2 className="text-lg font-bold">Downloadable Materials</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {lesson.materials.map((material, index) => {
                    // Determine icon based on filename
                    let FileIcon = FaFile;
                    if (material.name.toLowerCase().endsWith(".pdf")) {
                      FileIcon = FaFilePdf;
                    } else if (material.name.toLowerCase().includes("doc")) {
                      FileIcon = FaFileAlt;
                    }

                    return (
                      <li key={index} className="group">
                        <a
                          href={material.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 bg-gray-50 hover:bg-blue-50 rounded-md border border-gray-200 transition-all"
                        >
                          <FileIcon className="text-gray-500 group-hover:text-blue-600 mr-3 text-lg" />
                          <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                            {material.name}
                          </span>
                          <div className="ml-auto bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium group-hover:bg-blue-200 transition-colors">
                            Download
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
