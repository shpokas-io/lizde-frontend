'use client';

import { notFound, useParams } from "next/navigation";
import BackButton from "@/components/common/BackButton";
import Link from "next/link";
import Image from "next/image";
import { courseData } from "@/app/lib/courseData";
import { FaFileDownload, FaFilePdf, FaFileAlt, FaFile, FaArrowRight, FaArrowLeft, FaPlay, FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCourse } from "@/app/lib/CourseContext";

// Import the Lesson type directly from courseData
import type { Lesson } from "@/app/lib/courseData";

// Add type declaration for YouTube API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
  }
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

export default function LessonDetailPage() {
  // Get the slug from the URL params
  const params = useParams();
  const slug = params.slug as string;
  const lesson = getLessonBySlug(slug);
  const { isLessonCompleted, markLessonAsCompleted, updateLessonProgress } = useCourse();
  
  const [videoProgress, setVideoProgress] = useState(0);
  const [showCompletedBanner, setShowCompletedBanner] = useState(false);

  // Initialize on page load
  useEffect(() => {
    if (!lesson) return;
    setShowCompletedBanner(isLessonCompleted(slug));
    
    // Set up YouTube API for tracking progress
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    
    // This function would be called once YouTube API is ready
    window.onYouTubeIframeAPIReady = () => {
      // We can't directly access iframes in this way due to security restrictions
      // This is a placeholder - actual YouTube integration would require more work
      console.log("YouTube API ready");
    };
    
    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, [slug, isLessonCompleted, lesson]);
  
  // Handle completion button click
  const handleMarkAsCompleted = () => {
    markLessonAsCompleted(slug);
    setShowCompletedBanner(true);
  };

  // Simulate video progress update
  useEffect(() => {
    // In a real implementation, this would be triggered by the YouTube Player API
    // For this demo, we'll simulate progress with a timer
    let timer: NodeJS.Timeout;
    
    if (!isLessonCompleted(slug)) {
      timer = setInterval(() => {
        setVideoProgress(prev => {
          const newProgress = Math.min(prev + 5, 100);
          updateLessonProgress(slug, newProgress);
          
          // Auto-complete when progress reaches 90%
          if (newProgress >= 90) {
            clearInterval(timer);
            markLessonAsCompleted(slug);
            setShowCompletedBanner(true);
          }
          
          return newProgress;
        });
      }, 3000); // Update every 3 seconds for demo
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [slug, markLessonAsCompleted, updateLessonProgress, isLessonCompleted]);

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

            {/* Progress and completion controls */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-full md:w-2/3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">Video Progress</span>
                    <span className="text-xs font-medium text-orange-600">{videoProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Watch 90% of the video to automatically mark as completed</p>
                </div>
                
                <button 
                  onClick={handleMarkAsCompleted}
                  disabled={isLessonCompleted(slug)}
                  className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
                    isLessonCompleted(slug) 
                      ? 'bg-green-500 cursor-default' 
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  {isLessonCompleted(slug) ? (
                    <>
                      <FaCheck className="mr-2" />
                      Completed
                    </>
                  ) : (
                    'Mark as Completed'
                  )}
                </button>
              </div>
            </div>
            
            {/* Completed banner */}
            {showCompletedBanner && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                <p className="font-semibold">
                  You have completed this lesson!
                </p>
              </div>
            )}
          </div>

          {/* Right Aside */}
          <aside className="w-full lg:w-80 self-start">
            {/* Coming Up Box */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center border-b border-gray-100 pb-3">
                <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm">
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
                    <div className="flex items-center justify-center bg-gray-200 rounded-full w-8 h-8 mr-3 group-hover:bg-orange-100 transition-colors">
                      <FaArrowLeft className="h-3 w-3 text-gray-500 group-hover:text-orange-600" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs text-gray-500 font-medium">Previous Lesson</div>
                      <div className="text-sm font-medium text-gray-700 group-hover:text-orange-600 whitespace-nowrap overflow-hidden text-ellipsis">
                        {prevLesson.title}
                      </div>
                    </div>
                  </Link>
                )}
                
                {nextLesson && (
                  <Link
                    href={`/courses/${nextLesson.slug}`}
                    className="group block bg-white hover:bg-orange-50 rounded-md border border-gray-200 overflow-hidden transition-all"
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
                        <div className="rounded-full bg-black bg-opacity-70 w-10 h-10 flex items-center justify-center group-hover:bg-orange-600 group-hover:scale-110 transition-all">
                          <FaPlay className="h-3 w-3 text-white ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                        {nextLesson.duration}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-xs text-orange-600 font-medium uppercase tracking-wide mb-1">Next Up</div>
                      <div className="font-medium text-gray-800 group-hover:text-orange-700">
                        {nextLesson.title}
                      </div>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <FaArrowRight className="text-xs text-orange-500 mr-1" />
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
                  <FaFileDownload className="text-orange-600 mr-2 text-xl" />
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
                          className="flex items-center p-3 bg-gray-50 hover:bg-orange-50 rounded-md border border-gray-200 transition-all"
                        >
                          <FileIcon className="text-gray-500 group-hover:text-orange-600 mr-3 text-lg" />
                          <span className="text-gray-700 group-hover:text-orange-700 font-medium">
                            {material.name}
                          </span>
                          <div className="ml-auto bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium group-hover:bg-orange-200 transition-colors">
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
