import { getCourseData, getStartHereLesson, getLessonBySlug as getLessonBySlugFromDb } from "@/services/courseService";
import type { Lesson, CourseSectionData } from "@/types/course";

export async function getAllLessons(): Promise<Lesson[]> {
  const [courseData, startHereLesson] = await Promise.all([
    getCourseData(),
    getStartHereLesson()
  ]);

  if (!startHereLesson) {
    console.warn("Start here lesson is not defined");
    return courseData.flatMap((section) => section.lessons);
  }

  return [startHereLesson, ...courseData.flatMap((section) => section.lessons)];
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  if (!slug) {
    console.error("Invalid slug provided to getLessonBySlug");
    return null;
  }

  return await getLessonBySlugFromDb(slug);
}

export async function getSectionByLessonSlug(
  slug: string
): Promise<CourseSectionData | undefined> {
  if (!slug) return undefined;

  const courseData = await getCourseData();
  return courseData.find((section) =>
    section.lessons.some((lesson) => lesson.slug === slug)
  );
}

export async function getAdjacentLessons(currentSlug: string): Promise<{
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
}> {
  if (!currentSlug) {
    console.error("Invalid slug provided to getAdjacentLessons");
    return { prevLesson: null, nextLesson: null };
  }

  try {
    const allLessons = await getAllLessons();
    const currentIndex = allLessons.findIndex((l) => l.slug === currentSlug);

    if (currentIndex === -1) {
      return { prevLesson: null, nextLesson: null };
    }

    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson =
      currentIndex < allLessons.length - 1
        ? allLessons[currentIndex + 1]
        : null;

    return { prevLesson, nextLesson };
  } catch (error) {
    console.error("Error getting adjacent lessons:", error);
    return { prevLesson: null, nextLesson: null };
  }
}

export async function getTotalLessonCount(): Promise<number> {
  try {
    const courseData = await getCourseData();
    const startHereLesson = await getStartHereLesson();
    
    const sectionsCount = courseData.reduce(
      (acc, section) => acc + section.lessons.length,
      0
    );
    return startHereLesson ? sectionsCount + 1 : sectionsCount;
  } catch (error) {
    console.error("Error calculating total lesson count:", error);
    return 0;
  }
}

export async function getLessonsBySections(): Promise<{
  sectionTitle: string;
  lessons: Lesson[];
}[]> {
  const courseData = await getCourseData();
  return courseData.map((section) => ({
    sectionTitle: section.sectionTitle,
    lessons: section.lessons,
  }));
}

export async function getSectionCompletion(
  sectionTitle: string,
  completedLessons: string[]
): Promise<number> {
  const courseData = await getCourseData();
  const section = courseData.find((s) => s.sectionTitle === sectionTitle);
  if (!section) return 0;

  const completedInSection = section.lessons.filter((lesson) =>
    completedLessons.includes(lesson.slug)
  ).length;

  return (completedInSection / section.lessons.length) * 100;
}
