/**
 * Enhanced custom hook for managing course progress with error handling
 */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getTotalLessonCount, getSectionCompletion } from "@/utils/courseUtils";
import {
  saveCompletedLessons,
  isLessonCompleted as checkLessonCompleted,
  saveLastAccessedLesson,
  getCourseProgressData,
} from "@/services/storageService";

interface CourseProgressContextType {
  completedLessons: string[];
  getProgress: () => number;
  getSectionProgress: (sectionTitle: string) => number;
  markLessonAsCompleted: (slug: string) => void;
  isLessonCompleted: (slug: string) => boolean;
  lastAccessedLesson: string | null;
  resetProgress: () => void;
  loading: boolean;
}

const CourseProgressContext = createContext<
  CourseProgressContextType | undefined
>(undefined);

export function CourseProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [lastAccessedLesson, setLastAccessedLesson] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Load saved data on mount
  useEffect(() => {
    try {
      setLoading(true);
      const progressData = getCourseProgressData();
      setCompletedLessons(progressData.completedLessons || []);
      setLastAccessedLesson(progressData.lastAccessedLesson || null);
    } catch (error) {
      console.error("Error loading course progress:", error);
      // Fallback to empty state on error
      setCompletedLessons([]);
      setLastAccessedLesson(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      if (!loading) {
        saveCompletedLessons(completedLessons);
      }
    } catch (error) {
      console.error("Error saving completed lessons:", error);
    }
  }, [completedLessons, loading]);

  // Calculate overall course progress
  const getProgress = (): number => {
    try {
      const totalLessons = getTotalLessonCount();
      if (totalLessons === 0) return 0;
      return Math.round((completedLessons.length / totalLessons) * 100);
    } catch (error) {
      console.error("Error calculating progress:", error);
      return 0;
    }
  };

  // Calculate progress for a specific section
  const getSectionProgress = (sectionTitle: string): number => {
    try {
      return getSectionCompletion(sectionTitle, completedLessons);
    } catch (error) {
      console.error(
        `Error calculating section progress for ${sectionTitle}:`,
        error
      );
      return 0;
    }
  };

  // Mark a lesson as completed
  const markLessonAsCompleted = (slug: string) => {
    try {
      if (!slug) {
        console.warn("Attempted to mark empty slug as completed");
        return;
      }

      if (!completedLessons.includes(slug)) {
        setCompletedLessons((prev) => [...prev, slug]);
      }

      // Also update the last accessed lesson
      setLastAccessedLesson(slug);
      saveLastAccessedLesson(slug);
    } catch (error) {
      console.error(`Error marking lesson ${slug} as completed:`, error);
    }
  };

  // Check if a lesson is completed
  const isLessonCompleted = (slug: string): boolean => {
    try {
      if (!slug) return false;
      return checkLessonCompleted(slug, completedLessons);
    } catch (error) {
      console.error(`Error checking if lesson ${slug} is completed:`, error);
      return false;
    }
  };

  // Reset all progress
  const resetProgress = () => {
    try {
      setCompletedLessons([]);
      setLastAccessedLesson(null);
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  const value = {
    completedLessons,
    getProgress,
    getSectionProgress,
    markLessonAsCompleted,
    isLessonCompleted,
    lastAccessedLesson,
    resetProgress,
    loading,
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error(
      "useCourseProgress must be used within a CourseProgressProvider"
    );
  }
  return context;
}
