import { CourseSectionData, Lesson } from "@/types/course";
import { apiService } from "@/lib/api";

// Cache for course data
let courseDataCache: CourseSectionData[] | null = null;
let courseDataPromise: Promise<CourseSectionData[]> | null = null;

export async function getCourseData(forceRefresh = false): Promise<CourseSectionData[]> {
  console.log('getCourseData called with forceRefresh:', forceRefresh);
  
  // Return cached data if available and not forcing refresh
  if (courseDataCache && !forceRefresh) {
    console.log('Returning cached course data');
    return courseDataCache;
  }

  // If there's an ongoing request, return that promise
  if (courseDataPromise && !forceRefresh) {
    console.log('Returning existing course data promise');
    return courseDataPromise;
  }

  console.log('Making new course data request');
  
  // Create new request using authenticated API service
  courseDataPromise = apiService.get('/courses')
    .then((data) => {
      console.log('Course data received successfully:', data);
      courseDataCache = data;
      return data;
    })
    .catch((error) => {
      console.error('Failed to fetch course data:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw new Error(`Failed to fetch course data: ${error.message}`);
    })
    .finally(() => {
      courseDataPromise = null;
    });

  return courseDataPromise;
}

// Prefetch course data
export function prefetchCourseData() {
  console.log('Prefetching course data');
  if (!courseDataCache && !courseDataPromise) {
    getCourseData();
  }
}

// Cache for individual lessons
const lessonCache = new Map<string, Lesson>();

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  console.log('getLessonBySlug called with slug:', slug);
  
  // Return cached lesson if available
  if (lessonCache.has(slug)) {
    console.log('Returning cached lesson for slug:', slug);
    return lessonCache.get(slug) || null;
  }

  try {
    console.log('Fetching lesson from API for slug:', slug);
    const lesson = await apiService.get(`/courses/lesson/${slug}`);
    console.log('Lesson fetched successfully:', lesson);
    lessonCache.set(slug, lesson);
    return lesson;
  } catch (error) {
    console.error(`Failed to fetch lesson ${slug}:`, error);
    return null;
  }
}

// Prefetch a specific lesson
export function prefetchLesson(slug: string) {
  console.log('Prefetching lesson:', slug);
  if (!lessonCache.has(slug)) {
    getLessonBySlug(slug);
  }
}
