"use client";

import { courseData } from "@/app/lib/courseData";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CourseContextType {
  completedLessons: string[];
  getProgress: () => number;
  markLessonAsCompleted: (slug: string) => void;
  isLessonCompleted: (slug: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedLessons");

    if (savedCompleted) {
      setCompletedLessons(JSON.parse(savedCompleted));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  const getProgress = (): number => {
    const totalLessons =
      courseData.reduce((acc, section) => acc + section.lessons.length, 0) + 1; // +1 for start-here
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
    completedLessons,
    getProgress,
    markLessonAsCompleted,
    isLessonCompleted,
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
