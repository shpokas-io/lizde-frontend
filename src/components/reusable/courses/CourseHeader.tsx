import ProgressBar from "@/components/reusable/courses/ProgressBar";

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
    <div className="bg-white shadow-md mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={imageUrl}
            alt={title}
            className="w-full lg:w-1/3 rounded-lg shadow-md"
          />
          <div className="lg:ml-8 mt-4 lg:mt-0 text-center lg:text-left">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-700 mt-2">{description}</p>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
}
