"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { CourseSectionData } from "@/types/course";
import { getCourseData, prefetchCourseData } from "@/services/courseService";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, loading: authLoading } = useAuth();

  const loadCourseData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const sections = await getCourseData(forceRefresh);
      setCourseData(sections);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to load course data")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      loadCourseData();
      prefetchCourseData();
    } else if (!authLoading && !user) {
      setCourseData([]);
      setLoading(false);
      setError(null);
    }
  }, [user, authLoading]);

  const refreshCourseData = async () => {
    if (user) {
      await loadCourseData(true);
    }
  };

  const value = {
    courseData,
    loading: loading || authLoading,
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
