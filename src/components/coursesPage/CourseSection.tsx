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
  headerBgColor = "var(--primary)",
}: CourseSectionProps) {
  const lessonsWithStatus = section.lessons.map((lesson) => ({
    ...lesson,
    completed: lessonCompletionMap[lesson.slug] || false,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div
        className="px-6 py-4 border-b border-gray-200"
        style={{ backgroundColor: headerBgColor }}
      >
        <h2 className="text-xl font-bold text-white">{section.sectionTitle}</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {lessonsWithStatus.map((lesson) => (
          <div key={lesson.slug} className="px-4 py-2">
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
}
