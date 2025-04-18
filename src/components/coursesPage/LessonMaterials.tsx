import { FaDownload } from "react-icons/fa";
import { Material } from "@/types/course";

interface LessonMaterialsProps {
  materials: Material[];
  className?: string;
}

export default function LessonMaterials({
  materials,
  className = "",
}: LessonMaterialsProps) {
  if (!materials || materials.length === 0) {
    return null;
  }

  return (
    <div
      className={`bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 shadow-sm ${className}`}
    >
      <h2 className="text-lg font-bold mb-4 flex items-center border-b border-gray-800 pb-3 text-white">
        Downloadable Materials
      </h2>
      <div className="space-y-3">
        {materials.map((material, index) => (
          <a
            key={index}
            href={material.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center bg-[#232323] hover:bg-[#2a2a2a] px-3 py-2 rounded-md border border-gray-800 transition-all"
          >
            <div className="flex items-center justify-center bg-[#1a1a1a] rounded-full w-8 h-8 mr-3 group-hover:bg-orange-500/10 transition-colors">
              <FaDownload className="h-3 w-3 text-gray-400 group-hover:text-orange-500" />
            </div>
            <span className="text-sm font-medium text-gray-300 group-hover:text-orange-500">
              {material.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
