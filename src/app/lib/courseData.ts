export interface Material {
  name: string;
  url: string;
}

export interface Lesson {
  slug: string;
  title: string;
  duration: string;
  description: string;
  videoThumbnail: string;
  videoUrl: string; // Hardcoded YouTube link
  completed: boolean;
  progress?: number; // Track video progress (0-100)
  materials?: Material[] | string;
}

export interface CourseSectionData {
  sectionTitle: string;
  lessons: Lesson[];
  material?: string;
}

// Updated course data structure organized by weeks
export const courseData: CourseSectionData[] = [
  {
    // Pirma savaitė (Week 1) - 9 videos
    sectionTitle: "Pirma savaitė",
    lessons: [
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
      {
        slug: "managing-your-mix-session",
        title: "Managing Your Mix Session",
        duration: "15 minutes",
        description:
          "Part 2 of the M3 Method for Massive Mixes is Management...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "organization-and-routing",
        title: "Organization and Routing",
        duration: "9 minutes",
        description:
          "Video walkthrough of the organization and routing setup in this mix session...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "mixstarter-template",
        title: "MixStarter Template",
        duration: "20 minutes",
        description: "MixStarter + Mix FX Template have been customized!...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "mix-skills",
        title: "Mix Skills",
        duration: "11 minutes",
        description: "Part 3 of the M3 Method: Mix Skills...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "kick-and-snare",
        title: "Kick and Snare",
        duration: "30 minutes",
        description: "Let's dig into drums, starting with Kick and Snare...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "toms-cymbals-room",
        title: "Toms, Cymbals and Room",
        duration: "35 minutes",
        description:
          "REFERENCE NOTES: 01:14 - Jordans tom splitting technique 02:20...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "drum-buss-fx",
        title: "Drum Buss & FX",
        duration: "16 minutes",
        description:
          "REFERENCE NOTES: 00:20 - Overview of main drum buss 00:56...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "bass",
        title: "Bass",
        duration: "25 minutes",
        description:
          "REFERENCE NOTES: 00:05 - Note about the bass tracks 01:11...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
    ],
  },
  {
    // Antra savaitė (Week 2) - 4 videos
    sectionTitle: "Antra savaitė",
    lessons: [
      {
        slug: "guitars",
        title: "Guitars",
        duration: "25 minutes",
        description:
          "REFERENCE NOTES: 00:11 - Discussion about guitar tone 03:33...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "micronome-fx",
        title: "Metronome FX",
        duration: "8 minutes",
        description:
          "Okay so I'm also going to cover this metronome track just for fun in this video...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "vocals",
        title: "Vocals",
        duration: "44 minutes",
        description:
          "REFERENCE NOTES: 00:19 - The importance of a great vocal mix 02:11...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "bugnu-vst",
        title: "Būgnų vst",
        duration: "15 minutes",
        description: "Kaip užloadinti, ką pasirinkti...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
    ],
  },
  {
    // Trečia savaitė (Week 3) - 5 videos
    sectionTitle: "Trečia savaitė",
    lessons: [
      {
        slug: "gitaru-vst",
        title: "Gitarų vst",
        duration: "9 minutes",
        description: "Ką pasirinkti, kaip užloadinti",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "bugnu-pradzia",
        title: "Būgnų pradžia",
        duration: "15 minutes",
        description:
          "Kaip įsirašyti tik su 2 mikrafais ir su 2 mikrafais 4 tekeliais",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "intonacija",
        title: "Intonacija",
        duration: "15 minutes",
        description: "How to ensure proper intonation in your recordings",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "boso-programavimas",
        title: "Boso programavimas + humanizing",
        duration: "15 minutes",
        description: "How to program bass parts that sound natural",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
      {
        slug: "advanced-mixing",
        title: "Advanced Mixing Techniques",
        duration: "22 minutes",
        description:
          "Take your mixing skills to the next level with these advanced techniques",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        completed: false,
      },
    ],
  },
];
