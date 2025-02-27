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
        title: "Garso kortos",
        description:
          "The first step in the M3 Method for Massive Mixes is getting your mindset right. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=VlMcH7SltfM",
        materials: [
          { name: "Material 1", url: "https://swistranswer.com/link1" },
          { name: "Material 2", url: "https://swistranswer.com/link2" },
        ],
      },
      {
        slug: "managing-your-mix-session",
        title: "Ausinės",
        description:
          "Part 2 of the M3 Method for Massive Mixes is Management. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. Nulla facilisi. Maecenas faucibus mollis interdum.",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=TZJtBJTuELc",
      },
      {
        slug: "organization-and-routing",
        title: "DAW",
        description:
          "Video walkthrough of the organization and routing setup in this mix session...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=jQpCe-nSAg0",
      },
      {
        slug: "mixstarter-template",
        title: "Mikrafonai",
        description: "MixStarter + Mix FX Template have been customized!...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=-RjNNrHMwOU",
      },
      {
        slug: "mix-skills",
        title: "Būgnai ir gitaros",
        description: "Part 3 of the M3 Method: Mix Skills...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=YYd8sWzXrgw",
      },
      {
        slug: "kick-and-snare",
        title: "MIDI Kliaviatūros",
        description: "Let's dig into drums, starting with Kick and Snare...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=PWvmOm_vh0s",
      },
      {
        slug: "toms-cymbals-room",
        title: "Biudžetas",
        description:
          "REFERENCE NOTES: 01:14 - Jordans tom splitting technique 02:20...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=sC20lTEQVfo",
      },
      {
        slug: "drum-buss-fx",
        title: "Esminiai nustatymai",
        description:
          "REFERENCE NOTES: 00:20 - Overview of main drum buss 00:56...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=1XIZlH0J5mM",
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
        title: "Intro į 2 sav.",
        description:
          "REFERENCE NOTES: 00:11 - Discussion about guitar tone 03:33...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=DNr2Kc0WUKA",
      },
      {
        slug: "micronome-fx",
        title: "Programavimas",
        description:
          "Okay so I'm also going to cover this metronome track just for fun in this video...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=fHYCLhv7C1E",
      },
      {
        slug: "vocals",
        title: "Humanizavimas",
        description:
          "REFERENCE NOTES: 00:19 - The importance of a great vocal mix 02:11...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=ZLh_PvSwkMw",
      },
      {
        slug: "bugnu-vst",
        title: "Programavimas rankiniu būdu",
        description: "Kaip užloadinti, ką pasirinkti...",
        videoThumbnail: "/images/about-section.jpg",
        videoUrl: "https://www.youtube.com/watch?v=fAHKCv3pzsY",
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
  title: "Pradėk nuo čia!",
  description:
    "Welcome to the course! You've taken a big step in making this investment. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna eu sem commodo tempor. Praesent vel ultrices nisi, in pulvinar tellus. Donec accumsan odio ut diam lacinia, vel euismod nulla tincidunt. Vestibulum eget ligula at nisi pellentesque sodales sit amet id nibh. Nullam porttitor, tellus in molestie ornare, justo nisl faucibus dui, eget venenatis erat augue vel arcu. Praesent varius velit quis urna hendrerit, a gravida velit lobortis. Aliquam at augue dapibus, commodo justo vel, iaculis velit. Suspendisse potenti. Donec et molestie ipsum. Maecenas feugiat urna vel dapibus suscipit. Curabitur mattis velit at risus vehicula, et dapibus libero facilisis.",
  videoThumbnail: "/images/about-section.jpg",
  videoUrl: "https://www.youtube.com/watch?v=Po4syWgC4Vk",
};
