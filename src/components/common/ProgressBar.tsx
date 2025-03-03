interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const progressBarColor =
    progress > 0
      ? "bg-gradient-to-r from-green-500 to-green-600"
      : "bg-gradient-to-r from-primary to-primary-dark";

  return (
    <div className="w-full bg-background-alt rounded-full h-2.5 overflow-hidden">
      <div
        className={`${progressBarColor} h-2.5 rounded-full transition-all duration-300 ease-in-out relative`}
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
}
