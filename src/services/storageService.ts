/**
 * Storage service for handling data persistence
 */

const STORAGE_KEYS = {
  COMPLETED_LESSONS: 'completedLessons',
};

/**
 * Gets completed lessons from localStorage
 */
export function getCompletedLessons(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }
  
  const savedCompleted = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
  return savedCompleted ? JSON.parse(savedCompleted) : [];
}

/**
 * Saves completed lessons to localStorage
 */
export function saveCompletedLessons(completedLessons: string[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completedLessons));
}

/**
 * Checks if a lesson is completed
 */
export function isLessonCompleted(slug: string, completedLessons: string[]): boolean {
  return completedLessons.includes(slug);
}

/**
 * Marks a lesson as completed
 */
export function markLessonAsCompleted(slug: string, completedLessons: string[]): string[] {
  if (completedLessons.includes(slug)) {
    return completedLessons;
  }
  
  const updatedLessons = [...completedLessons, slug];
  saveCompletedLessons(updatedLessons);
  return updatedLessons;
}