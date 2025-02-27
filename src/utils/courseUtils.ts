/**
 * Utility functions for working with course data
 */
import { courseData, startHereLesson } from "@/services/courseData";
import type { Lesson } from "@/types/course";

/**
 * Gets all lessons across all course sections including the start here lesson
 */
export function getAllLessons(): Lesson[] {
  return [startHereLesson, ...courseData.flatMap((section) => section.lessons)];
}

/**
 * Finds a lesson by its slug
 */
export function getLessonBySlug(slug: string): Lesson | undefined {
  // Special case check for the start here lesson
  if (slug === startHereLesson.slug) {
    return startHereLesson;
  }

  // Check in regular course sections
  return courseData
    .flatMap((section) => section.lessons)
    .find((lesson) => lesson.slug === slug);
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

  // If lesson not found
  if (currentIndex === -1) {
    return { prevLesson: null, nextLesson: null };
  }

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return { prevLesson, nextLesson };
}

/**
 * Calculates the total number of lessons in the course
 */
export function getTotalLessonCount(): number {
  return (
    courseData.reduce((acc, section) => acc + section.lessons.length, 0) + 1
  ); // +1 for start-here
}
