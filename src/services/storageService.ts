/**
 * Enhanced storage service for handling data persistence with error handling
 */
import { CourseProgressData } from "@/types/course";

const STORAGE_KEYS = {
  COMPLETED_LESSONS: "completedLessons",
  LAST_ACCESSED: "lastAccessed",
  COURSE_PROGRESS: "courseProgress",
};

/**
 * Check if localStorage is available in the current environment
 */
function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn("localStorage is not available:", e);
    return false;
  }
}

/**
 * Safely get data from localStorage with proper error handling
 */
function safeGetItem<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
}

/**
 * Safely set data in localStorage with proper error handling
 */
function safeSetItem<T>(key: string, value: T): boolean {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error storing ${key} in localStorage:`, error);
    return false;
  }
}

/**
 * Gets completed lessons from localStorage
 */
export function getCompletedLessons(): string[] {
  return safeGetItem<string[]>(STORAGE_KEYS.COMPLETED_LESSONS, []);
}

/**
 * Saves completed lessons to localStorage
 */
export function saveCompletedLessons(completedLessons: string[]): boolean {
  return safeSetItem(STORAGE_KEYS.COMPLETED_LESSONS, completedLessons);
}

/**
 * Checks if a lesson is completed
 */
export function isLessonCompleted(
  slug: string,
  completedLessons: string[]
): boolean {
  return completedLessons.includes(slug);
}

/**
 * Marks a lesson as completed
 */
export function markLessonAsCompleted(
  slug: string,
  completedLessons: string[]
): string[] {
  if (completedLessons.includes(slug)) {
    return completedLessons;
  }

  const updatedLessons = [...completedLessons, slug];
  saveCompletedLessons(updatedLessons);
  return updatedLessons;
}

/**
 * Saves the last accessed lesson
 */
export function saveLastAccessedLesson(slug: string): boolean {
  const now = new Date().toISOString();
  return safeSetItem(STORAGE_KEYS.LAST_ACCESSED, { slug, timestamp: now });
}

/**
 * Gets the last accessed lesson
 */
export function getLastAccessedLesson(): {
  slug: string;
  timestamp: string;
} | null {
  return safeGetItem(STORAGE_KEYS.LAST_ACCESSED, null);
}

/**
 * Gets the full course progress data
 */
export function getCourseProgressData(): CourseProgressData {
  const completedLessons = getCompletedLessons();
  const lastAccessed = getLastAccessedLesson();

  return {
    completedLessons,
    lastAccessedDate: lastAccessed?.timestamp,
    lastAccessedLesson: lastAccessed?.slug,
  };
}

/**
 * Clears all course progress data (for testing or reset functionality)
 */
export function clearCourseProgressData(): boolean {
  try {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_LESSONS);
      localStorage.removeItem(STORAGE_KEYS.LAST_ACCESSED);
      localStorage.removeItem(STORAGE_KEYS.COURSE_PROGRESS);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error clearing course progress data:", error);
    return false;
  }
}
