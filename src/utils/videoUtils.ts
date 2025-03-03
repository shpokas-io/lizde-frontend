/**
 * Enhanced utility functions for handling video URLs and embeds
 */

interface VideoProvider {
  name: string;
  urlPatterns: RegExp[];
  getEmbedUrl: (url: string, videoId: string) => string;
  getThumbnailUrl: (videoId: string) => string;
  extractVideoId: (url: string) => string | null;
}

// YouTube provider implementation
const youtubeProvider: VideoProvider = {
  name: "youtube",
  urlPatterns: [
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/,
    /youtube\.com\/shorts\/([^\s&?/]+)/,
  ],
  getEmbedUrl: (url, videoId) => {
    // Add parameters for better embedding
    const params = new URLSearchParams({
      rel: "0", // Don't show related videos
      showinfo: "0", // Don't show video title
      autoplay: "0", // Don't autoplay
      modestbranding: "1", // Minimal YouTube branding
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  },
  getThumbnailUrl: (videoId) =>
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  extractVideoId: (url) => {
    for (const pattern of youtubeProvider.urlPatterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  },
};

// Vimeo provider implementation (for future expansion)
const vimeoProvider: VideoProvider = {
  name: "vimeo",
  urlPatterns: [/vimeo\.com\/(?:video\/)?(\d+)/],
  getEmbedUrl: (url, videoId) => `https://player.vimeo.com/video/${videoId}`,
  getThumbnailUrl: (videoId) => `https://vumbnail.com/${videoId}.jpg`,
  extractVideoId: (url) => {
    const match = url.match(vimeoProvider.urlPatterns[0]);
    return match && match[1] ? match[1] : null;
  },
};

// List of supported providers
const videoProviders: VideoProvider[] = [youtubeProvider, vimeoProvider];

/**
 * Determines which video provider a URL belongs to
 */
export function getVideoProvider(url: string): VideoProvider | null {
  if (!url) return null;

  return (
    videoProviders.find((provider) =>
      provider.urlPatterns.some((pattern) => pattern.test(url))
    ) || null
  );
}

/**
 * Extracts video ID from a URL
 */
export function getVideoId(url: string): string {
  try {
    const provider = getVideoProvider(url);
    if (!provider) {
      console.warn(`Unsupported video URL format: ${url}`);
      return "";
    }

    const videoId = provider.extractVideoId(url);
    if (!videoId) {
      console.warn(`Could not extract video ID from: ${url}`);
      return "";
    }

    return videoId;
  } catch (error) {
    console.error("Error extracting video ID:", error);
    return "";
  }
}

/**
 * Converts a video URL to an embed URL
 */
export function getEmbedUrl(url: string): string {
  try {
    const provider = getVideoProvider(url);
    if (!provider) {
      console.warn(`Unsupported video URL: ${url}`);
      // Return the original URL as fallback
      return url;
    }

    const videoId = provider.extractVideoId(url);
    if (!videoId) {
      console.warn(`Could not extract video ID from: ${url}`);
      return url;
    }

    return provider.getEmbedUrl(url, videoId);
  } catch (error) {
    console.error("Error generating embed URL:", error);
    return url;
  }
}

/**
 * Gets the thumbnail URL for a video
 */
export function getVideoThumbnail(url: string): string {
  try {
    const provider = getVideoProvider(url);
    if (!provider) {
      console.warn(`Unsupported video URL for thumbnail: ${url}`);
      // Return a placeholder image
      return "/images/video-placeholder.jpg";
    }

    const videoId = provider.extractVideoId(url);
    if (!videoId) {
      console.warn(`Could not extract video ID for thumbnail from: ${url}`);
      return "/images/video-placeholder.jpg";
    }

    return provider.getThumbnailUrl(videoId);
  } catch (error) {
    console.error("Error getting video thumbnail:", error);
    return "/images/video-placeholder.jpg";
  }
}

/**
 * Validates if a string is a valid video URL from supported providers
 */
export function isValidVideoUrl(url: string): boolean {
  if (!url) return false;

  return videoProviders.some((provider) =>
    provider.urlPatterns.some((pattern) => pattern.test(url))
  );
}
