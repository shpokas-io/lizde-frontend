export interface Lesson {
  slug: string;
  title: string;
  duration: string;
  description: string;
  videoThumbnail: string;
  videoUrl: string; // Hardcoded YouTube link
  completed: boolean;
  materials: string;
}

export interface CourseSectionData {
  sectionTitle: string;
  lessons: Lesson[];
  material: string;
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
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: true,
        materials: [
          { name: "Material 1", url: "https://swistranswer.com/link1" },
          { name: "Material 2", url: "https://swistranswer.com/link2" },
        ],
      },
      {
        slug: "your-mixing-mindset",
        title: "Your Mixing Mindset",
        duration: "10 minutes",
        description:
          "The first step in the M3 Method for Massive Mixes is getting your mindset right...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
        materials: [
          { name: "Material 1", url: "https://swistranswer.com/link1" },
          { name: "Material 2", url: "https://swistranswer.com/link2" },
        ],
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
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: true,
      },
      {
        slug: "gitaru-vst",
        title: "Gitarų vst",
        duration: "9 minutes",
        description: "Ką pasirinkti, kaip užloadinti",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
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
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
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
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
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
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: true,
      },
      // ... more lessons
    ],
  },
];
