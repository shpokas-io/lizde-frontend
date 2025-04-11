interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-[#232323] rounded-full h-2 overflow-hidden">
      <div
        className="bg-gradient-to-r from-orange-500 to-orange-400 h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
