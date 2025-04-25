const { createClient } = require('@supabase/supabase-js');
const { courseData, startHereLesson } = require('@/services/courseData');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please check your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateCourseData() {
  try {
    console.log('Starting migration...');

    // First, insert the start here lesson
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
      console.error('Error inserting start here lesson:', startHereError);
      throw startHereError;
    }

    console.log('Start here lesson inserted successfully');

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
        console.error('Error inserting start here materials:', materialsError);
        throw materialsError;
      }

      console.log('Start here materials inserted successfully');
    }

    // Insert sections and their lessons
    for (const [sectionIndex, section] of courseData.entries()) {
      console.log(`Processing section: ${section.sectionTitle}`);

      // Insert section
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
        console.error(`Error inserting section ${section.sectionTitle}:`, sectionError);
        throw sectionError;
      }

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
          console.error(`Error inserting lesson ${lesson.title}:`, lessonError);
          throw lessonError;
        }

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
            console.error(`Error inserting materials for lesson ${lesson.title}:`, materialsError);
            throw materialsError;
          }
        }
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migrateCourseData(); 