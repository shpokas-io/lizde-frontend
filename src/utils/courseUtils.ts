import type { Lesson, CourseSectionData } from "@/types/course";

export function getLessonBySlug(
  courseData: CourseSectionData[],
  slug: string
): Lesson | null {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  for (const section of courseData) {
    const lesson = section.lessons.find((lesson) => lesson.slug === slug);
    if (lesson) {
      return lesson;
    }
  }

  return null;
}

export function getSectionByLessonSlug(
  courseData: CourseSectionData[],
  slug: string
): CourseSectionData | null {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  return courseData.find((section) =>
    section.lessons.some((lesson) => lesson.slug === slug)
  ) || null;
}

export function getAdjacentLessons(
  courseData: CourseSectionData[],
  currentSlug: string
): {
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
} {
  if (!currentSlug || typeof currentSlug !== "string") {
    return {
      previousLesson: null,
      nextLesson: null,
    };
  }

  try {
    const allLessons: Lesson[] = [];
    courseData.forEach((section) => {
      allLessons.push(...section.lessons);
    });

    const currentIndex = allLessons.findIndex(
      (lesson) => lesson.slug === currentSlug
    );

    if (currentIndex === -1) {
      return {
        previousLesson: null,
        nextLesson: null,
      };
    }

    return {
      previousLesson: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
      nextLesson:
        currentIndex < allLessons.length - 1
          ? allLessons[currentIndex + 1]
          : null,
    };
  } catch (error) {
    return {
      previousLesson: null,
      nextLesson: null,
    };
  }
}

export function getTotalLessonCount(courseData: CourseSectionData[]): number {
  try {
    return courseData.reduce(
      (total, section) => total + section.lessons.length,
      0
    );
  } catch (error) {
    return 0;
  }
}

export function getAllLessons(courseData: CourseSectionData[]): Lesson[] {
  return courseData.flatMap((section) => section.lessons);
}

export function getLessonsBySections(courseData: CourseSectionData[]): {
  sectionTitle: string;
  lessons: Lesson[];
}[] {
  return courseData.map((section) => ({
    sectionTitle: section.sectionTitle,
    lessons: section.lessons,
  }));
}

export function getSectionCompletion(
  courseData: CourseSectionData[],
  sectionTitle: string,
  completedLessons: string[]
): number {
  const section = courseData.find((s) => s.sectionTitle === sectionTitle);
  if (!section) return 0;

  const completedInSection = section.lessons.filter((lesson) =>
    completedLessons.includes(lesson.slug)
  ).length;

  return (completedInSection / section.lessons.length) * 100;
}
