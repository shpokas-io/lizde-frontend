import { createClient } from '@supabase/supabase-js';
import { courseData, startHereLesson } from '@/services/courseData';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateCourseData() {
  try {
    console.log('Starting migration...');
    console.log('Using Supabase URL:', supabaseUrl);

    // First, clear existing data in the correct order (respecting foreign key constraints)
    console.log('Clearing existing data...');
    
    // Delete all data from each table
    const { error: materialsError } = await supabase
      .from('materials')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Using a valid UUID

    if (materialsError) {
      console.error('Error deleting materials:', JSON.stringify(materialsError, null, 2));
      throw materialsError;
    }

    const { error: lessonsError } = await supabase
      .from('lessons')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (lessonsError) {
      console.error('Error deleting lessons:', JSON.stringify(lessonsError, null, 2));
      throw lessonsError;
    }

    const { error: sectionsError } = await supabase
      .from('sections')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (sectionsError) {
      console.error('Error deleting sections:', JSON.stringify(sectionsError, null, 2));
      throw sectionsError;
    }

    console.log('All existing data cleared successfully');

    // First, insert the start here lesson
    console.log('Inserting start here lesson...');
    const { data: startHereData, error: startHereError } = await supabase
      .from('lessons')
      .insert({
        slug: startHereLesson.slug,
        title: startHereLesson.title,
        description: startHereLesson.description,
        video_thumbnail: startHereLesson.videoThumbnail,
        video_url: startHereLesson.videoUrl,
        order_index: 0,
      })
      .select()
      .single();

    if (startHereError) {
      console.error('Error inserting start here lesson:', JSON.stringify(startHereError, null, 2));
      throw startHereError;
    }

    console.log('Start here lesson data:', JSON.stringify(startHereData, null, 2));

    // Insert materials for start here lesson
    if (startHereLesson.materials) {
      const materials = startHereLesson.materials.map((material: any) => ({
        lesson_id: startHereData.id,
        name: material.name,
        url: material.url,
      }));

      const { error: materialsError } = await supabase
        .from('materials')
        .insert(materials);

      if (materialsError) {
        console.error('Error inserting start here materials:', JSON.stringify(materialsError, null, 2));
        throw materialsError;
      }

      console.log('Start here materials inserted successfully');
    }

    // Then insert sections and their lessons
    console.log('Inserting sections...');
    for (const [sectionIndex, section] of courseData.entries()) {
      const { data: sectionData, error: sectionError } = await supabase
        .from('sections')
        .insert({
          title: section.sectionTitle,
          description: section.description,
          order_index: sectionIndex + 1,
        })
        .select()
        .single();

      if (sectionError) {
        console.error(`Error inserting section ${section.sectionTitle}:`, JSON.stringify(sectionError, null, 2));
        throw sectionError;
      }

      console.log(`Inserted section: ${section.sectionTitle}`);

      // Insert lessons for this section
      for (const [lessonIndex, lesson] of section.lessons.entries()) {
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .insert({
            section_id: sectionData.id,
            slug: lesson.slug,
            title: lesson.title,
            description: lesson.description,
            video_thumbnail: lesson.videoThumbnail,
            video_url: lesson.videoUrl,
            order_index: lessonIndex,
          })
          .select()
          .single();

        if (lessonError) {
          console.error(`Error inserting lesson ${lesson.title}:`, JSON.stringify(lessonError, null, 2));
          throw lessonError;
        }

        console.log(`Inserted lesson: ${lesson.title}`);

        // Insert materials for this lesson
        if (lesson.materials) {
          const materials = lesson.materials.map((material: any) => ({
            lesson_id: lessonData.id,
            name: material.name,
            url: material.url,
          }));

          const { error: materialsError } = await supabase
            .from('materials')
            .insert(materials);

          if (materialsError) {
            console.error(`Error inserting materials for lesson ${lesson.title}:`, JSON.stringify(materialsError, null, 2));
            throw materialsError;
          }

          console.log(`Inserted materials for lesson: ${lesson.title}`);
        }
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', JSON.stringify(error, null, 2));
    process.exit(1);
  }
}

migrateCourseData(); 