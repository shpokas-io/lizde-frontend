/**
 * Utility functions for working with course data
 */
import { courseData } from "@/services/courseData";
import type { Lesson } from "@/types/course";

/**
 * Gets all lessons across all course sections
 */
export function getAllLessons(): Lesson[] {
  return courseData.flatMap((section) => section.lessons);
}

/**
 * Finds a lesson by its slug
 */
export function getLessonBySlug(slug: string): Lesson | undefined {
  return getAllLessons().find((lesson) => lesson.slug === slug);
}

/**
 * Gets the previous and next lessons based on the current lesson slug
 */
export function getAdjacentLessons(currentSlug: string): {
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
} {
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.slug === currentSlug);

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { prevLesson, nextLesson };
}

/**
 * Calculates the total number of lessons in the course
 */
export function getTotalLessonCount(): number {
  return courseData.reduce((acc, section) => acc + section.lessons.length, 0) + 1; // +1 for start-here
}