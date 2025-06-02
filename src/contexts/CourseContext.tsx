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
import { useAuthState } from "@/hooks/useAuthState";

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
  const { user, loading: authLoading } = useAuthState();

  const loadCourseData = async (forceRefresh = false) => {
    try {
      console.log("CourseContext: Loading course data...", {
        user: user?.email,
        forceRefresh,
      });
      setLoading(true);
      setError(null);
      const sections = await getCourseData(forceRefresh);
      setCourseData(sections);
      console.log("CourseContext: Course data loaded successfully");
    } catch (err) {
      console.error("CourseContext: Failed to load course data:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to load course data")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("CourseContext: Auth state changed:", {
      user: user?.email,
      authLoading,
      hasUser: !!user,
    });

    // Only fetch data when user is authenticated and auth is not loading
    if (!authLoading && user) {
      console.log("CourseContext: User authenticated, loading course data...");
      loadCourseData();
      // Prefetch course data for faster subsequent loads
      prefetchCourseData();
    } else if (!authLoading && !user) {
      console.log("CourseContext: No user authenticated, clearing course data");
      setCourseData([]);
      setLoading(false);
      setError(null);
    } else {
      console.log("CourseContext: Still loading auth state...");
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
