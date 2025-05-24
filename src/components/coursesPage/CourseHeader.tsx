import ProgressBar from "@/components/common/ProgressBar";
import Image from "next/image";

interface CourseHeaderProps {
  title: string;
  description: string;
  imageUrl: string;
  progress: number;
  className?: string;
}

export default function CourseHeader({
  title,
  description,
  imageUrl,
  progress,
  className = "",
}: CourseHeaderProps) {
  return (
    <div className={`bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800 ${className}`}>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-2 -left-2 w-20 h-20 bg-orange-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500 rounded-full opacity-20 blur-xl"></div>
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={300}
              className="w-full rounded-xl shadow-lg object-cover relative z-10 max-h-[300px]"
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <div>
              <span className="bg-orange-500/10 text-orange-500 text-xs uppercase font-bold px-3 py-1 rounded-full">
                Tavo augimo erdvė
              </span>
              <h1 className="text-4xl font-bold mt-3 mb-5 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                {title}
              </h1>
              <div className="h-px w-full bg-gradient-to-r from-orange-500/30 to-transparent mb-5"></div>
              <p className="text-gray-400 leading-relaxed bg-[#232323] p-4 rounded-lg border border-gray-800">
                {description}
              </p>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">
                  Kūrso progresas
                </span>
                <span className="text-sm font-medium text-orange-500">
                  {progress}%
                </span>
              </div>
              <ProgressBar progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
