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
  materials?: Material[];
  duration?: number;
}

export interface CourseSectionData {
  sectionTitle: string;
  lessons: Lesson[];
  description?: string;
}

export interface VideoPlayerState {
  isLoading: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  error: Error | null;
}
