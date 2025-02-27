import { FaFileDownload, FaFilePdf, FaFileAlt, FaFile } from "react-icons/fa";
import { Material } from "@/types/course";

interface LessonMaterialsProps {
  materials: Material[];
  className?: string;
}

/**
 * Component for displaying lesson downloadable materials
 */
export default function LessonMaterials({ materials, className = "" }: LessonMaterialsProps) {
  if (!materials || materials.length === 0) {
    return null;
  }
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <div className="flex items-center mb-4">
        <FaFileDownload className="text-orange-600 mr-2 text-xl" />
        <h2 className="text-lg font-bold">Downloadable Materials</h2>
      </div>
      <ul className="flex flex-col gap-3">
        {materials.map((material, index) => {
          // Determine icon based on filename
          let FileIcon = FaFile;
          if (material.name.toLowerCase().endsWith(".pdf")) {
            FileIcon = FaFilePdf;
          } else if (material.name.toLowerCase().includes("doc")) {
            FileIcon = FaFileAlt;
          }

          return (
            <li key={index} className="group">
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 hover:bg-orange-50 rounded-md border border-gray-200 transition-all"
              >
                <FileIcon className="text-gray-500 group-hover:text-orange-600 mr-3 text-lg" />
                <span className="text-gray-700 group-hover:text-orange-700 font-medium">
                  {material.name}
                </span>
                <div className="ml-auto bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium group-hover:bg-orange-200 transition-colors">
                  Download
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}