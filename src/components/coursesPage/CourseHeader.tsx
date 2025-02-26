import ProgressBar from "@/components/common/ProgressBar";
import Image from "next/image";

interface CourseHeaderProps {
  title: string;
  description: string;
  imageUrl: string;
  progress: number;
}

export default function CourseHeader({
  title,
  description,
  imageUrl,
  progress,
}: CourseHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl overflow-hidden border border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-2 -left-2 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>
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
              <span className="bg-blue-100 text-blue-700 text-xs uppercase font-bold px-3 py-1 rounded-full">Your Journey</span>
              <h1 className="text-4xl font-bold mt-3 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">{title}</h1>
              <p className="text-gray-600 mt-4 leading-relaxed">{description}</p>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Course progress</span>
                <span className="text-sm font-medium text-blue-600">{progress}%</span>
              </div>
              <ProgressBar progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
