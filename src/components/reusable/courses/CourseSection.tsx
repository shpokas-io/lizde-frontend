interface Lesson {
  title: string;
  duration: string;
  description: string;
  videoThumbnail: string;
  completed: boolean;
}

interface CourseSectionProps {
  title: string;
  lessons: Lesson[];
}

export default function CourseSection({ title, lessons }: CourseSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-start"
          >
            <img
              src={lesson.videoThumbnail}
              alt={lesson.title}
              className="w-24 h-24 rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg font-bold">{lesson.title}</h3>
              <p className="text-sm text-gray-600">{lesson.duration}</p>
              <p className="text-sm mt-2">{lesson.description}</p>
              {lesson.completed && (
                <span className="text-green-500 text-xs mt-2">Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
