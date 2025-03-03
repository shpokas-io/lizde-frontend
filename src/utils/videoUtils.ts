/**
 * Utility functions for handling video URLs and thumbnails
 */

/**
 * Extracts YouTube video ID from a YouTube URL
 * Supports various YouTube URL formats
 */
export function getYouTubeId(url: string): string {
  if (!url) return "";

  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  // Log an error if URL doesn't match expected patterns
  console.warn(`Could not extract YouTube ID from: ${url}`);
  return "";
}

/**
 * Converts a YouTube URL to an embed URL for iframe
 */
export function getEmbedUrl(url: string): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return url;

  // Add parameters for better embedding experience
  return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`;
}

/**
 * Gets the thumbnail URL for a YouTube video with specified quality
 * @param url YouTube video URL
 * @param quality Thumbnail quality: 'default', 'mq' (medium), 'hq' (high), 'sd' (standard def), 'maxres'
 * @returns URL to the YouTube thumbnail
 */
export function getYouTubeThumbnail(
  url: string,
  quality: "default" | "mq" | "hq" | "sd" | "maxres" = "hq"
): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return "/images/video-placeholder.jpg";

  const qualityMap = {
    default: "default.jpg",
    mq: "mqdefault.jpg",
    hq: "hqdefault.jpg",
    sd: "sddefault.jpg",
    maxres: "maxresdefault.jpg",
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

/**
 * Checks if a URL is a valid YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
}
