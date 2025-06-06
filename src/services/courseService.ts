import { CourseSectionData, Lesson } from "@/types/course";
import { apiService } from "@/lib/api";

let courseDataCache: CourseSectionData[] | null = null;
let courseDataPromise: Promise<CourseSectionData[]> | null = null;

export async function getCourseData(
  forceRefresh = false
): Promise<CourseSectionData[]> {
  if (courseDataCache && !forceRefresh) {
    return courseDataCache;
  }

  if (courseDataPromise && !forceRefresh) {
    return courseDataPromise;
  }

  courseDataPromise = apiService
    .get("/courses")
    .then((data) => {
      courseDataCache = data;
      return data;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch course data: ${error.message}`);
    })
    .finally(() => {
      courseDataPromise = null;
    });

  return courseDataPromise;
}

export function prefetchCourseData() {
  if (!courseDataCache && !courseDataPromise) {
    getCourseData();
  }
}

const lessonCache = new Map<string, Lesson>();

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  if (lessonCache.has(slug)) {
    return lessonCache.get(slug) || null;
  }

  try {
    const lesson = await apiService.get(`/courses/lesson/${slug}`);
    lessonCache.set(slug, lesson);
    return lesson;
  } catch (error) {
    return null;
  }
}

export function prefetchLesson(slug: string) {
  if (!lessonCache.has(slug)) {
    getLessonBySlug(slug);
  }
}
