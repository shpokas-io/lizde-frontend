import { createClient } from "@supabase/supabase-js";
import { CourseSectionData, Lesson } from "@/types/course";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getCourseData(): Promise<CourseSectionData[]> {
  const { data: sections, error: sectionsError } = await supabase
    .from("sections")
    .select("*")
    .order("order_index");

  if (sectionsError) throw sectionsError;

  const courseData: CourseSectionData[] = [];

  for (const section of sections) {
    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select(
        `
        *,
        materials (*)
      `
      )
      .eq("section_id", section.id)
      .order("order_index");

    if (lessonsError) throw lessonsError;

    const formattedLessons = lessons.map((lesson) => ({
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      videoThumbnail: lesson.video_thumbnail,
      videoUrl: lesson.video_url,
      materials: lesson.materials?.map((material: { name: any; url: any }) => ({
        name: material.name,
        url: material.url,
      })),
    }));

    courseData.push({
      sectionTitle: section.title,
      description: section.description,
      lessons: formattedLessons,
    });
  }

  return courseData;
}

export async function getStartHereLesson(): Promise<Lesson | null> {
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select(
      `
      *,
      materials (*)
    `
    )
    .eq("order_index", 0)
    .single();

  if (lessonError) return null;

  return {
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    videoThumbnail: lesson.video_thumbnail,
    videoUrl: lesson.video_url,
    materials: lesson.materials?.map((material: { name: any; url: any }) => ({
      name: material.name,
      url: material.url,
    })),
  };
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select(
      `
      *,
      materials (*)
    `
    )
    .eq("slug", slug)
    .single();

  if (lessonError) return null;

  return {
    slug: lesson.slug,
    title: lesson.title,
    description: lesson.description,
    videoThumbnail: lesson.video_thumbnail,
    videoUrl: lesson.video_url,
    materials: lesson.materials?.map((material: { name: any; url: any }) => ({
      name: material.name,
      url: material.url,
    })),
  };
}
