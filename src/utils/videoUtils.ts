/**
 * Utility functions for handling video URLs and embeds
 */

/**
 * Extracts YouTube video ID from a YouTube URL
 */
export function getYouTubeId(url: string): string {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

/**
 * Converts a YouTube watch URL to an embed URL
 */
export function getEmbedUrl(url: string): string {
  return url.replace("watch?v=", "embed/");
}

/**
 * Gets the thumbnail URL for a YouTube video
 */
export function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}