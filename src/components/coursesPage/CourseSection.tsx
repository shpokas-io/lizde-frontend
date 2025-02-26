'use client';

import Link from "next/link";
import Image from "next/image";
import { useCourse } from "@/app/lib/CourseContext";
import { Lesson } from "@/app/lib/courseData";

interface CourseSectionProps {
  title: string;
  lessons: Lesson[];
}

export default function CourseSection({ title, lessons }: CourseSectionProps) {
  const { isLessonCompleted } = useCourse();
  return (
    <div className="py-8">
      <div className="mb-8">
        <div className="relative inline-block">
          <h2 className="text-2xl font-bold text-gray-900 relative">
            {title}
            <span className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transform translate-y-2 w-full opacity-75"></span>
            <span className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full transform translate-y-2 w-10 opacity-100 animate-pulse"></span>
          </h2>
        </div>
      </div>
      
      <div className={`${lessons.length === 1 ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-2 gap-8"}`}>
        {lessons.map((lesson) => (
          <Link key={lesson.slug} href={`/courses/${lesson.slug}`} className={`${lessons.length === 1 ? "max-w-xl" : ""}`}>
            <div className="group relative overflow-hidden bg-white rounded-2xl transition-all duration-300 hover:translate-y-[-8px] shadow-sm hover:shadow-xl border border-gray-100">
              {/* Top colored bar indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 z-10"></div>
              
              {/* Thumbnail with overlay */}
              <div className="aspect-video relative overflow-hidden">
                {/* Decorative patterns */}
                <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-orange-400 opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute -left-12 -top-12 w-40 h-40 bg-orange-500 opacity-10 rounded-full blur-2xl"></div>
                
                {/* Background image with overlay */}
                <Image
                  src={lesson.videoThumbnail}
                  alt={lesson.title}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transform group-hover:scale-100 scale-75 transition-all duration-300">
                  <button className="bg-orange-500 bg-opacity-80 backdrop-blur-sm p-4 rounded-full hover:bg-opacity-90 transition-all duration-200 border border-orange-400/30 shadow-lg group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {/* Duration badge */}
                <div className="absolute bottom-4 left-4 z-20">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {lesson.duration}
                  </span>
                </div>
                
                {/* Completion status */}
                {isLessonCompleted(lesson.slug) && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/80 backdrop-blur-sm text-white text-xs font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Completed
                    </span>
                  </div>
                )}
                
                {/* Title overlay for small screens */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                  <h3 className="text-white font-bold line-clamp-2">{lesson.title}</h3>
                </div>
              </div>
              
              {/* Content section */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2 hidden md:block">{lesson.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{lesson.description}</p>
                </div>
                
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  {isLessonCompleted(lesson.slug) ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-green-600 text-xs font-medium">Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                      <span className="text-orange-600 text-xs font-medium">Not started</span>
                    </div>
                  )}
                  
                  <span className="inline-flex items-center text-sm text-gray-600 font-medium group-hover:text-orange-600 transition-colors">
                    Watch
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
