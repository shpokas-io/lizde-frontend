import type { CourseSectionData, Lesson } from "@/types/course";

export const startHereLesson: Lesson = {
  slug: "start-here",
  title: "Pradėk nuo čia!",
  description:
    "Welcome to the course! You've taken a big step in making this investment. This introduction will guide you through how to get the most out of this course and prepare you for your learning journey.",
  videoThumbnail: "/images/about-section.jpg",
  videoUrl: "https://www.youtube.com/watch?v=Po4syWgC4Vk",
  materials: [
    {
      name: "Course Overview PDF",
      url: "https://swistranswer.com/course-overview",
    },
    {
      name: "Equipment Checklist",
      url: "https://swistranswer.com/equipment-checklist",
    },
  ],
};

export const courseData: CourseSectionData[] = [
  {
    sectionTitle: "Pirma savaitė",
    lessons: [
      {
        slug: "your-mixing-mindset",
        title: "Garso kortos",
        description:
          "The first step in the M3 Method for Massive Mixes is getting your mindset right. We'll explore the essential audio interfaces you need for your home studio setup and how to choose the right one for your needs.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VlMcH7SltfM",
        materials: [
          {
            name: "Audio Interface Comparison",
            url: "https://swistranswer.com/audio-interfaces",
          },
          {
            name: "Setup Guide",
            url: "https://swistranswer.com/interface-setup",
          },
        ],
      },
      {
        slug: "managing-your-mix-session",
        title: "Ausinės",
        description:
          "Part 2 of the M3 Method for Massive Mixes is Management. Learn how to select the right headphones for monitoring and mixing, and understand the difference between open-back and closed-back designs.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=TZJtBJTuELc",
        materials: [
          {
            name: "Headphone Selection Guide",
            url: "https://swistranswer.com/headphones",
          },
        ],
      },
      {
        slug: "organization-and-routing",
        title: "DAW",
        description:
          "Video walkthrough of the organization and routing setup in your Digital Audio Workstation. Learn the fundamentals of setting up an efficient workflow in your chosen DAW.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=jQpCe-nSAg0",
        materials: [
          {
            name: "DAW Comparison Chart",
            url: "https://swistranswer.com/daw-comparison",
          },
        ],
      },
      {
        slug: "mixstarter-template",
        title: "Mikrafonai",
        description:
          "A detailed guide to microphones for recording. Learn about dynamic, condenser, and ribbon microphones and when to use each type.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=-RjNNrHMwOU",
        materials: [
          {
            name: "Microphone Techniques",
            url: "https://swistranswer.com/mic-techniques",
          },
        ],
      },
      {
        slug: "mix-skills",
        title: "Būgnai ir gitaros",
        description:
          "Part 3 of the M3 Method: Mix Skills. Learn the fundamentals of recording and mixing drums and guitars effectively.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=YYd8sWzXrgw",
        materials: [
          {
            name: "Drum Miking Guide",
            url: "https://swistranswer.com/drum-miking",
          },
        ],
      },
      {
        slug: "kick-and-snare",
        title: "MIDI Kliaviatūros",
        description:
          "Everything you need to know about MIDI keyboards and controllers for your production setup.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=PWvmOm_vh0s",
        materials: [
          {
            name: "MIDI Controller Basics",
            url: "https://swistranswer.com/midi-basics",
          },
        ],
      },
      {
        slug: "toms-cymbals-room",
        title: "Biudžetas",
        description:
          "How to build a studio on a budget. Learn cost-effective strategies for creating professional-sounding recordings without breaking the bank.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=sC20lTEQVfo",
        materials: [
          {
            name: "Budget Equipment List",
            url: "https://swistranswer.com/budget-gear",
          },
        ],
      },
      {
        slug: "drum-buss-fx",
        title: "Esminiai nustatymai",
        description:
          "Essential settings for your recording environment. Learn how to optimize your DAW and system for the best performance.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=1XIZlH0J5mM",
        materials: [
          {
            name: "Optimization Checklist",
            url: "https://swistranswer.com/optimization",
          },
        ],
      },
      {
        slug: "bass",
        title: "Bass",
        description:
          "Everything you need to know about recording and mixing bass. Techniques for capturing a powerful, clear bass sound.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        materials: [
          {
            name: "Bass EQ Cheat Sheet",
            url: "https://swistranswer.com/bass-eq",
          },
        ],
      },
    ],
  },
  {
    // Antra savaitė (Week 2)
    sectionTitle: "Antra savaitė",
    lessons: [
      {
        slug: "guitars",
        title: "Intro į 2 sav.",
        description:
          "Introduction to the second week of the course. Overview of what we'll cover in the coming lessons.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=DNr2Kc0WUKA",
        materials: [
          {
            name: "Week 2 Overview",
            url: "https://swistranswer.com/week2-overview",
          },
        ],
      },
      {
        slug: "micronome-fx",
        title: "Programavimas",
        description:
          "Introduction to programming music and using software tools to enhance your productions.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=fHYCLhv7C1E",
        materials: [
          {
            name: "MIDI Programming Guide",
            url: "https://swistranswer.com/midi-programming",
          },
        ],
      },
      {
        slug: "vocals",
        title: "Humanizavimas",
        description:
          "The art of humanizing digital music. Learn techniques to make programmed music feel more natural and expressive.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=ZLh_PvSwkMw",
        materials: [
          {
            name: "Humanization Techniques",
            url: "https://swistranswer.com/humanization",
          },
        ],
      },
      {
        slug: "bugnu-vst",
        title: "Programavimas rankiniu būdu",
        description:
          "Manual programming techniques for creating more authentic drum patterns and performances.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=fAHKCv3pzsY",
        materials: [
          {
            name: "Manual Programming Guide",
            url: "https://swistranswer.com/manual-programming",
          },
        ],
      },
    ],
  },
  {
    // Trečia savaitė (Week 3)
    sectionTitle: "Trečia savaitė",
    lessons: [
      {
        slug: "gitaru-vst",
        title: "Gitarų vst",
        description:
          "A comprehensive guide to guitar VST plugins. How to choose, set up, and get the most out of virtual guitar instruments.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        materials: [
          {
            name: "Guitar VST Comparison",
            url: "https://swistranswer.com/guitar-vst",
          },
        ],
      },
      {
        slug: "bugnu-pradzia",
        title: "Būgnų pradžia",
        description:
          "Getting started with drum recording. Learn how to record drums with minimal equipment - just two microphones and four tracks.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        materials: [
          {
            name: "Minimal Drum Recording",
            url: "https://swistranswer.com/minimal-drums",
          },
        ],
      },
      {
        slug: "intonacija",
        title: "Intonacija",
        description:
          "How to ensure proper intonation in your recordings. Techniques for tuning instruments and correcting pitch issues.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        materials: [
          {
            name: "Intonation Guide",
            url: "https://swistranswer.com/intonation",
          },
        ],
      },
      {
        slug: "boso-programavimas",
        title: "Boso programavimas + humanizing",
        description:
          "How to program bass parts that sound natural. Combining programming with humanization techniques for realistic bass tracks.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        materials: [
          {
            name: "Bass Programming",
            url: "https://swistranswer.com/bass-programming",
          },
        ],
      },
      {
        slug: "advanced-mixing",
        title: "Advanced Mixing Techniques",
        description:
          "Take your mixing skills to the next level with these advanced techniques. Learn professional approaches to creating dynamic, clear mixes.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=9Q_4vUDimdI",
        materials: [
          {
            name: "Advanced Mixing Guide",
            url: "https://swistranswer.com/advanced-mixing",
          },
        ],
      },
    ],
  },
];
