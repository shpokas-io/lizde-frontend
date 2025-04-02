import { courseData, startHereLesson } from "@/services/courseData";
import type { Lesson, CourseSectionData } from "@/types/course";

export function getAllLessons(): Lesson[] {
  if (!startHereLesson) {
    console.warn("Start here lesson is not defined");
    return courseData.flatMap((section) => section.lessons);
  }

  return [startHereLesson, ...courseData.flatMap((section) => section.lessons)];
}

export function getLessonBySlug(slug: string): Lesson | undefined {
  if (!slug) {
    console.error("Invalid slug provided to getLessonBySlug");
    return undefined;
  }

  if (startHereLesson && slug === startHereLesson.slug) {
    return startHereLesson;
  }

  try {
    return courseData
      .flatMap((section) => section.lessons)
      .find((lesson) => lesson.slug === slug);
  } catch (error) {
    console.error("Error finding lesson by slug:", error);
    return undefined;
  }
}

export function getSectionByLessonSlug(
  slug: string
): CourseSectionData | undefined {
  if (!slug) return undefined;

  return courseData.find((section) =>
    section.lessons.some((lesson) => lesson.slug === slug)
  );
}

export function getAdjacentLessons(currentSlug: string): {
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
} {
  if (!currentSlug) {
    console.error("Invalid slug provided to getAdjacentLessons");
    return { prevLesson: null, nextLesson: null };
  }

  try {
    const allLessons = getAllLessons();
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

export function getTotalLessonCount(): number {
  try {
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

export function getLessonsBySections(): {
  sectionTitle: string;
  lessons: Lesson[];
}[] {
  return courseData.map((section) => ({
    sectionTitle: section.sectionTitle,
    lessons: section.lessons,
  }));
}

export function getSectionCompletion(
  sectionTitle: string,
  completedLessons: string[]
): number {
  const section = courseData.find((s) => s.sectionTitle === sectionTitle);

  if (!section) return 0;

  const totalLessons = section.lessons.length;
  if (totalLessons === 0) return 0;

  const completedInSection = section.lessons.filter((lesson) =>
    completedLessons.includes(lesson.slug)
  ).length;

  return Math.round((completedInSection / totalLessons) * 100);
}
