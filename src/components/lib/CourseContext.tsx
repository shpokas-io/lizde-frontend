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
  completedLessons: string[]; // Array of lesson slugs
  getProgress: () => number;
  markLessonAsCompleted: (slug: string) => void;
  isLessonCompleted: (slug: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load saved data on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedLessons");

    if (savedCompleted) {
      setCompletedLessons(JSON.parse(savedCompleted));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Calculate overall course progress
  const getProgress = (): number => {
    // Calculate total number of lessons across all sections
    const totalLessons =
      courseData.reduce((acc, section) => acc + section.lessons.length, 0) + 1; // +1 for start-here
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  // Mark a lesson as completed
  const markLessonAsCompleted = (slug: string) => {
    if (!completedLessons.includes(slug)) {
      setCompletedLessons((prev) => [...prev, slug]);
    }
  };

  // Check if a lesson is completed
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
