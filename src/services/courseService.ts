import { CourseSectionData, Lesson } from "@/types/course";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Cache for course data
let courseDataCache: CourseSectionData[] | null = null;
let courseDataPromise: Promise<CourseSectionData[]> | null = null;

export async function getCourseData(forceRefresh = false): Promise<CourseSectionData[]> {
  // Return cached data if available and not forcing refresh
  if (courseDataCache && !forceRefresh) {
    return courseDataCache;
  }

  // If there's an ongoing request, return that promise
  if (courseDataPromise && !forceRefresh) {
    return courseDataPromise;
  }

  // Create new request
  courseDataPromise = fetch(`${API_URL}/courses`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch course data');
      }
      const data = await response.json();
      courseDataCache = data;
      return data;
    })
    .finally(() => {
      courseDataPromise = null;
    });

  return courseDataPromise;
}

// Prefetch course data
export function prefetchCourseData() {
  if (!courseDataCache && !courseDataPromise) {
    getCourseData();
  }
}

// Cache for individual lessons
const lessonCache = new Map<string, Lesson>();

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  // Return cached lesson if available
  if (lessonCache.has(slug)) {
    return lessonCache.get(slug) || null;
  }

  const response = await fetch(`${API_URL}/courses/lesson/${slug}`);
  if (!response.ok) {
    return null;
  }
  
  const lesson = await response.json();
  lessonCache.set(slug, lesson);
  return lesson;
}

// Prefetch a specific lesson
export function prefetchLesson(slug: string) {
  if (!lessonCache.has(slug)) {
    getLessonBySlug(slug);
  }
}
