interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className="bg-gradient-to-r from-[#292f36] to-[#1d2129] h-2.5 rounded-full transition-all duration-300 ease-in-out relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
}
