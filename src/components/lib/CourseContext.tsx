"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CourseSectionData, Lesson } from "@/types/course";
import { getCourseData, getStartHereLesson } from "@/services/courseService";

interface CourseContextType {
  courseData: CourseSectionData[];
  startHereLesson: Lesson | null;
  completedLessons: string[];
  getProgress: () => number;
  markLessonAsCompleted: (slug: string) => void;
  isLessonCompleted: (slug: string) => boolean;
  loading: boolean;
  error: Error | null;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courseData, setCourseData] = useState<CourseSectionData[]>([]);
  const [startHereLesson, setStartHereLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        const [sections, startHere] = await Promise.all([
          getCourseData(),
          getStartHereLesson(),
        ]);

        setCourseData(sections);
        setStartHereLesson(startHere);

        // Load completed lessons from localStorage
        const savedCompleted = localStorage.getItem("completedLessons");
        if (savedCompleted) {
          setCompletedLessons(JSON.parse(savedCompleted));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load course data"));
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, []);

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  const getProgress = (): number => {
    const totalLessons = courseData.reduce((acc, section) => acc + section.lessons.length, 0) + (startHereLesson ? 1 : 0);
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  const markLessonAsCompleted = (slug: string) => {
    if (!completedLessons.includes(slug)) {
      setCompletedLessons((prev) => [...prev, slug]);
    }
  };

  const isLessonCompleted = (slug: string): boolean => {
    return completedLessons.includes(slug);
  };

  const value = {
    courseData,
    startHereLesson,
    completedLessons,
    getProgress,
    markLessonAsCompleted,
    isLessonCompleted,
    loading,
    error,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}
