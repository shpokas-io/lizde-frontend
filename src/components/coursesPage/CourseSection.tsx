import { CourseSectionData, LessonWithCompletionStatus } from "@/types/course";
import LessonCard from "../common/LessonCard";

interface CourseSectionProps {
  section: CourseSectionData;
  lessonCompletionMap: Record<string, boolean>;
  className?: string;
}

/**
 * Displays a course section with its title and lessons
 */
export default function CourseSection({ 
  section, 
  lessonCompletionMap,
  className = ""
}: CourseSectionProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-orange-50 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">{section.sectionTitle}</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {section.lessons.map((lesson) => {
          // Create a lesson with completion status
          const lessonWithStatus: LessonWithCompletionStatus = {
            ...lesson,
            completed: lessonCompletionMap[lesson.slug] || false
          };
          
          return (
            <div key={lesson.slug} className="px-4 py-2">
              <LessonCard lesson={lessonWithStatus} />
            </div>
          );
        })}
      </div>
    </div>
  );
}