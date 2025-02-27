/**
 * Course data structure containing all lessons and sections
 */
import type { CourseSectionData } from "@/types/course";

export const courseData: CourseSectionData[] = [
  {
    // Pirma savaitė (Week 1) - 9 videos
    sectionTitle: "Pirma savaitė",
    lessons: [
      {
        slug: "your-mixing-mindset",
        title: "Your Mixing Mindset",
        description:
          "The first step in the M3 Method for Massive Mixes is getting your mindset right...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        materials: [
          { name: "Material 1", url: "https://swistranswer.com/link1" },
          { name: "Material 2", url: "https://swistranswer.com/link2" },
        ],
      },
      {
        slug: "managing-your-mix-session",
        title: "Managing Your Mix Session",
        description:
          "Part 2 of the M3 Method for Massive Mixes is Management...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "organization-and-routing",
        title: "Organization and Routing",
        description:
          "Video walkthrough of the organization and routing setup in this mix session...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "mixstarter-template",
        title: "MixStarter Template",
        description: "MixStarter + Mix FX Template have been customized!...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "mix-skills",
        title: "Mix Skills",
        description: "Part 3 of the M3 Method: Mix Skills...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "kick-and-snare",
        title: "Kick and Snare",
        description: "Let's dig into drums, starting with Kick and Snare...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "toms-cymbals-room",
        title: "Toms, Cymbals and Room",
        description:
          "REFERENCE NOTES: 01:14 - Jordans tom splitting technique 02:20...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "drum-buss-fx",
        title: "Drum Buss & FX",
        description:
          "REFERENCE NOTES: 00:20 - Overview of main drum buss 00:56...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "bass",
        title: "Bass",
        description:
          "REFERENCE NOTES: 00:05 - Note about the bass tracks 01:11...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
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
        description:
          "REFERENCE NOTES: 00:11 - Discussion about guitar tone 03:33...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "micronome-fx",
        title: "Metronome FX",
        description:
          "Okay so I'm also going to cover this metronome track just for fun in this video...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "vocals",
        title: "Vocals",
        description:
          "REFERENCE NOTES: 00:19 - The importance of a great vocal mix 02:11...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "bugnu-vst",
        title: "Būgnų vst",
        description: "Kaip užloadinti, ką pasirinkti...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
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
        description: "Ką pasirinkti, kaip užloadinti",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "bugnu-pradzia",
        title: "Būgnų pradžia",
        description:
          "Kaip įsirašyti tik su 2 mikrafais ir su 2 mikrafais 4 tekeliais",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "intonacija",
        title: "Intonacija",
        description: "How to ensure proper intonation in your recordings",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "boso-programavimas",
        title: "Boso programavimas + humanizing",
        description: "How to program bass parts that sound natural",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
      {
        slug: "advanced-mixing",
        title: "Advanced Mixing Techniques",
        description:
          "Take your mixing skills to the next level with these advanced techniques",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
      },
    ],
  },
];

// Special "start here" lesson that exists outside the regular sections
export const startHereLesson = {
  slug: "start-here",
  title: "Start Here!",
  description:
    "Welcome to the course! You've taken a big step in making this investment...",
  videoThumbnail: "/images/about-section.jpg",
  videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
};