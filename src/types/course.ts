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
  materials?: Material[]; // Fixed to only accept Material array, not string
  duration?: number; // Optional duration in minutes
}

export interface CourseSectionData {
  sectionTitle: string;
  lessons: Lesson[];
  description?: string; // Optional section description
}

export interface LessonWithCompletionStatus extends Lesson {
  completed: boolean;
}

// New types for better organization
export interface CourseProgressData {
  completedLessons: string[];
  lastAccessedDate?: string;
  lastAccessedLesson?: string;
}

export interface VideoPlayerState {
  isLoading: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  error: Error | null;
}
