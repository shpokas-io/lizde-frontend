'use client';

import VideoPlayer from './VideoPlayer';

interface LessonVideoSectionProps {
  videoUrl: string;
  title?: string;
}

export default function LessonVideoSection({ videoUrl, title }: LessonVideoSectionProps) {
  // You can add more interactivity here if needed
  const handleReady = () => {};
  const handleError = (err: Error) => {
    // Optionally handle error
    console.error('Video player error:', err);
  };

  return (
    <VideoPlayer
      videoUrl={videoUrl}
      title={title}
      onReady={handleReady}
      onError={handleError}
    />
  );
} 