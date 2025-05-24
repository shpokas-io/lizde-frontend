"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CourseSectionData } from "@/types/course";
import { getCourseData, prefetchCourseData } from "@/services/courseService";

interface CourseContextType {
  courseData: CourseSectionData[];
  loading: boolean;
  error: Error | null;
  refreshCourseData: () => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courseData, setCourseData] = useState<CourseSectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadCourseData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const sections = await getCourseData(forceRefresh);
      setCourseData(sections);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load course data"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourseData();
    // Prefetch course data for faster subsequent loads
    prefetchCourseData();
  }, []);

  const refreshCourseData = async () => {
    await loadCourseData(true);
  };

  const value = {
    courseData,
    loading,
    error,
    refreshCourseData,
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
