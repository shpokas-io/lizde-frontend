/**
 * Custom hook for managing course progress
 */
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getTotalLessonCount } from "@/utils/courseUtils";
import {
  getCompletedLessons,
  saveCompletedLessons,
  isLessonCompleted as checkLessonCompleted
} from "@/services/storageService";

interface CourseProgressContextType {
  completedLessons: string[];
  getProgress: () => number;
  markLessonAsCompleted: (slug: string) => void;
  isLessonCompleted: (slug: string) => boolean;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export function CourseProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Load saved data on mount
  useEffect(() => {
    setCompletedLessons(getCompletedLessons());
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    saveCompletedLessons(completedLessons);
  }, [completedLessons]);

  // Calculate overall course progress
  const getProgress = (): number => {
    const totalLessons = getTotalLessonCount();
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
    return checkLessonCompleted(slug, completedLessons);
  };

  const value = {
    completedLessons,
    getProgress,
    markLessonAsCompleted,
    isLessonCompleted,
  };

  return (
    <CourseProgressContext.Provider value={value}>{children}</CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error("useCourseProgress must be used within a CourseProgressProvider");
  }
  return context;
}