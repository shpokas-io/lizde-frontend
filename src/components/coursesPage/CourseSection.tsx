import LessonCard from "@/components/common/LessonCard";
import { CourseSectionData } from "@/types/course";

interface CourseSectionProps {
  section: CourseSectionData;
  lessonCompletionMap: Record<string, boolean>;
  headerBgColor?: string;
}

/**
 * Displays a course section with a list of lessons
 */
export default function CourseSection({
  section,
  lessonCompletionMap,
  headerBgColor = "var(--primary)",
}: CourseSectionProps) {
  // Prepare lessons with completion status
  const lessonsWithStatus = section.lessons.map((lesson) => ({
    ...lesson,
    completed: lessonCompletionMap[lesson.slug] || false,
  }));

  return (
    <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
      <div
        className="px-6 py-4 border-b border-border"
        style={{ backgroundColor: headerBgColor }}
      >
        <h2 className="text-xl font-bold text-white">{section.sectionTitle}</h2>
      </div>
      <div className="divide-y divide-border">
        {lessonsWithStatus.map((lesson) => (
          <div key={lesson.slug} className="px-4 py-2">
            <LessonCard lesson={lesson} />
          </div>
        ))}
      </div>
    </div>
  );
}
