export function getYouTubeId(url: string): string {
  if (!url) return "";

  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  }

  console.warn(`Could not extract YouTube ID from: ${url}`);
  return "";
}

export function getEmbedUrl(url: string): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return url;

  return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&enablejsapi=1`;
}

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

export function isYouTubeUrl(url: string): boolean {
  if (!url) return false;

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return youtubeRegex.test(url);
}
