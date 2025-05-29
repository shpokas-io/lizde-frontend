import { CourseSectionData, Lesson } from "@/types/course";
import { apiService } from "@/lib/api";

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

  // Create new request using authenticated API service
  courseDataPromise = apiService.get('/courses')
    .then((data) => {
      courseDataCache = data;
      return data;
    })
    .catch((error) => {
      console.error('Failed to fetch course data:', error);
      throw new Error('Failed to fetch course data');
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

  try {
    const lesson = await apiService.get(`/courses/lesson/${slug}`);
    lessonCache.set(slug, lesson);
    return lesson;
  } catch (error) {
    console.error(`Failed to fetch lesson ${slug}:`, error);
    return null;
  }
}

// Prefetch a specific lesson
export function prefetchLesson(slug: string) {
  if (!lessonCache.has(slug)) {
    getLessonBySlug(slug);
  }
}
