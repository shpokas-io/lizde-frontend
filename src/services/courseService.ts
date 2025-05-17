import { CourseSectionData, Lesson } from "@/types/course";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCourseData(): Promise<CourseSectionData[]> {
  const response = await fetch(`${API_URL}/courses`);
  if (!response.ok) {
    throw new Error('Failed to fetch course data');
  }
  return response.json();
}

export async function getStartHereLesson(): Promise<Lesson | null> {
  const response = await fetch(`${API_URL}/courses/start-here`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  const response = await fetch(`${API_URL}/courses/lesson/${slug}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}
