import LessonCard from "@/components/common/LessonCard";
import { CourseSectionData } from "@/types/course";

interface CourseSectionProps {
  section: CourseSectionData;
  lessonCompletionMap: Record<string, boolean>;
  headerBgColor?: string;
}

export default function CourseSection({
  section,
  lessonCompletionMap,
  headerBgColor = "bg-orange-500/10",
}: CourseSectionProps) {
  const lessonsWithStatus = section.lessons.map((lesson) => ({
    ...lesson,
    completed: lessonCompletionMap[lesson.slug] || false,
  }));

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-sm overflow-hidden">
      <div className={`px-6 py-4 border-b border-gray-800 ${headerBgColor}`}>
        <h2 className="text-xl font-bold text-white">{section.sectionTitle}</h2>
      </div>
      <div className="divide-y divide-gray-800">
        {lessonsWithStatus.map((lesson) => (
          <div key={lesson.slug} className="px-4 py-2">
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
}
