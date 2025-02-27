/**
 * Core type definitions for course data structure
 */

export interface Material {
  name: string;
  url: string;
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  videoThumbnail: string;
  videoUrl: string;
  materials?: Material[] | string;
}

export interface CourseSectionData {
  sectionTitle: string;
  lessons: Lesson[];
  material?: string;
}

export interface LessonWithCompletionStatus extends Lesson {
  completed: boolean;
}