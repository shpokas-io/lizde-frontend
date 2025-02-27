"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { courseData } from "./courseData";

interface CourseContextType {
  completedLessons: string[]; // Array of lesson slugs
  inProgressLessons: Map<string, number>; // Map of lesson slug to progress percentage
  getProgress: () => number;
  markLessonAsCompleted: (slug: string) => void;
  updateLessonProgress: (slug: string, progress: number) => void;
  isLessonCompleted: (slug: string) => boolean;
  getLessonProgress: (slug: string) => number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [inProgressLessons, setInProgressLessons] = useState<
    Map<string, number>
  >(new Map());

  // Load saved data on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedLessons");
    const savedInProgress = localStorage.getItem("inProgressLessons");

    if (savedCompleted) {
      setCompletedLessons(JSON.parse(savedCompleted));
    }

    if (savedInProgress) {
      setInProgressLessons(new Map(JSON.parse(savedInProgress)));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem(
      "inProgressLessons",
      JSON.stringify(Array.from(inProgressLessons.entries()))
    );
  }, [inProgressLessons]);

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

  // Update lesson progress
  const updateLessonProgress = (slug: string, progress: number) => {
    // Auto-complete if progress is >= 90%
    if (progress >= 90) {
      markLessonAsCompleted(slug);
    }

    setInProgressLessons((prev) => {
      const newMap = new Map(prev);
      newMap.set(slug, progress);
      return newMap;
    });
  };

  // Check if a lesson is completed
  const isLessonCompleted = (slug: string): boolean => {
    return completedLessons.includes(slug);
  };

  // Get lesson progress
  const getLessonProgress = (slug: string): number => {
    return inProgressLessons.get(slug) || 0;
  };

  const value = {
    completedLessons,
    inProgressLessons,
    getProgress,
    markLessonAsCompleted,
    updateLessonProgress,
    isLessonCompleted,
    getLessonProgress,
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
