interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-background-alt rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-gradient-to-r from-primary to-primary-dark h-2.5 rounded-full transition-all duration-300 ease-in-out relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
}
