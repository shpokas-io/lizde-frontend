import { useState } from "react";
import LessonCard from "@/components/common/LessonCard";
import { CourseSectionData } from "@/types/course";

interface CourseSectionProps {
  section: CourseSectionData;
  headerBgColor?: string;
}

export default function CourseSection({
  section,
  headerBgColor = "bg-orange-500/10",
}: CourseSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 shadow-sm overflow-hidden">
      <button
        className={`w-full flex items-center justify-between px-6 py-4 border-b border-gray-800 ${headerBgColor} focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`section-${section.sectionTitle}`}
      >
        <h2 className="text-xl font-bold text-white text-left">{section.sectionTitle}</h2>
        <span
          className={`transform transition-transform duration-200 ${isOpen ? "rotate-90" : "rotate-0"}`}
        >
          {/* Simple Chevron Right SVG */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div
          id={`section-${section.sectionTitle}`}
          className="divide-y divide-gray-800 animate-fade-slide-down"
        >
          {section.lessons.map((lesson) => (
            <div key={lesson.slug} className="px-4 py-2">
              <LessonCard lesson={lesson} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Optionally, add this animation to your globals.css:
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
