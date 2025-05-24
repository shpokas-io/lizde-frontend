interface YT {
  Player: new (
    elementId: string,
    options: {
      videoId: string;
      playerVars?: {
        autoplay?: number;
        modestbranding?: number;
        rel?: number;
      };
      events?: {
        onReady?: (event: any) => void;
        onStateChange?: (event: any) => void;
        onError?: (event: any) => void;
      };
    }
  ) => any;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
    UNSTARTED: number;
  };
}

interface Window {
  YT: YT;
  onYouTubeIframeAPIReady: () => void;
} 