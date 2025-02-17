export interface Lesson {
  slug: string;
  title: string;
  duration: string;
  description: string;
  videoThumbnail: string;
  videoUrl: string; // Hardcoded YouTube link
  completed: boolean;
}

export interface CourseSectionData {
  sectionTitle: string;
  lessons: Lesson[];
}

export const courseData: CourseSectionData[] = [
  {
    sectionTitle:
      "Kokios įrangos reikia norint pradėti įrašus ir kaip ją tinkamai išsirinkti",
    lessons: [
      {
        slug: "start-here",
        title: "Start Here!",
        duration: "3 minutes",
        description:
          "Welcome to the course! You've taken a big step in making this investment...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_1",
        completed: true,
      },
      {
        slug: "your-mixing-mindset",
        title: "Your Mixing Mindset",
        duration: "10 minutes",
        description:
          "The first step in the M3 Method for Massive Mixes is getting your mindset right...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_2",
        completed: false,
      },
    ],
  },
  {
    sectionTitle: "Kokių programų/pluginų prireiks",
    lessons: [
      {
        slug: "bugnu-vst",
        title: "Būgnų vst",
        duration: "15 minutes",
        description: "Kaip užloadinti, ką pasirinkti...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_3",
        completed: true,
      },
      {
        slug: "gitaru-vst",
        title: "Gitarų vst",
        duration: "9 minutes",
        description: "Ką pasirinkti, kaip užloadinti",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_4",
        completed: true,
      },
      // ... more lessons
    ],
  },
  {
    sectionTitle: "Būgnai",
    lessons: [
      {
        slug: "bugnu-pradzia",
        title: "Būgnų pradžia",
        duration: "15 minutes",
        description:
          "Kaip įsirašyti tik su 2 mikrafais ir su 2 mikrafais 4 tekeliais",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_5",
        completed: true,
      },
      // ... more lessons
    ],
  },
  {
    sectionTitle: "Gitaros",
    lessons: [
      {
        slug: "intonacija",
        title: "Intonacija",
        duration: "15 minutes",
        description: "lorem dummy text",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_6",
        completed: true,
      },
      // ... more lessons
    ],
  },
  {
    sectionTitle: "Bosas",
    lessons: [
      {
        slug: "boso-programavimas",
        title: "PRogramavimas + humanizing",
        duration: "15 minutes",
        description: "lorem dummy text",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_7",
        completed: true,
      },
      // ... more lessons
    ],
  },
];
