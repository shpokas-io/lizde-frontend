import BackButton from "@/components/common/BackButton";
import SearcBar from "@/components/common/SearchBar";
import CourseHeader from "@/components/coursesPage/CourseHeader";
import CourseSection from "@/components/coursesPage/CourseSection";
import Footer from "@/components/layout/Footer";

export default function CoursesPage() {
  return (
    <div className="bg-gray-100 text-black">
      {/* Header Row */}
      <div className="container mx-auto max-w-screen-lg px-4 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <BackButton href="/" />
        <div className="mt-4 sm:mt-0">
          <SearcBar />
        </div>
      </div>

      {/* Course Header */}
      <div className="container mx-auto max-w-screen-lg px-4 pb-8">
        <CourseHeader
          title="Tavo muzikos karjėra prasideda čia"
          description="Start getting label-quality mixes so you can attract better artists, increase your rates, work on your own terms, and build an awesome career as a mixer."
          imageUrl="/images/about-section.jpg"
          progress={60}
        />
      </div>

      {/* Course Sections */}
      <div className="container mx-auto max-w-screen-lg px-4 py-8 space-y-12">
        <CourseSection
          title="Kokios įrangos reikia norint pradėti įrašus ir kaip ją tinkamai išsirintki"
          lessons={[
            {
              title: "Start Here!",
              duration: "3 minutes",
              description:
                "Welcome to the course! You've taken a big step in making this investment...",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Your Mixing Mindset",
              duration: "10 minutes",
              description:
                "The first step in the M3 Method for Massive Mixes is getting your mindset right...",
              videoThumbnail: "/images/about-section.jpg",
              completed: false,
            },
          ]}
        />
        <CourseSection
          title="Kokių programų/pluginų prireiks"
          lessons={[
            {
              title: "Būgnų vst",
              duration: "15 minutes",
              description: "Kaip užloadinti, ką pasirinkti...",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Gitarų vst",
              duration: "9 minutes",
              description: "Ką pasirinkti, kaip užloadinti",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Boso vst",
              duration: "9 minutes",
              description: "Ką pasirinkti, kaip užloadinti",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Vokalo vst",
              duration: "9 minutes",
              description: "Ką pasirinkti, kaip užloadinti",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Synthai vst",
              duration: "9 minutes",
              description: "Ką pasirinkti, kaip užloadinti",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
          ]}
        />
        <CourseSection
          title="Būgnai"
          lessons={[
            {
              title: "Būgnų pradžia",
              duration: "15 minutes",
              description:
                "Kaip įsirašyti tik su 2 mikrafais ir su 2 mikrafais 4 tekeliais",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Samplai",
              duration: "15 minutes",
              description:
                "Kaip įsirašyti tik su 2 mikrafais ir su 2 mikrafais 4 tekeliais",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Būgnų programavimas",
              duration: "15 minutes",
              description:
                "Kaip įsirašyti tik su 2 mikrafais ir su 2 mikrafais 4 tekeliais",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Humanizavimas (da fuq is this xd?)",
              duration: "15 minutes",
              description:
                "Kaip įsirašyti tik su 2 mikrafais ir su 2 mikrafais 4 tekeliais",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
          ]}
        />
        <CourseSection
          title="Gitaros"
          lessons={[
            {
              title: "Intonacija",
              duration: "15 minutes",
              description: "lorem dummy text",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Stygų keitimas + derinimas",
              duration: "15 minutes",
              description: "lorem dummy text",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Ampo setupas + micinimas",
              duration: "15 minutes",
              description: "lorem dummy text",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "IR'ai",
              duration: "15 minutes",
              description: "lorem dummy text",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
          ]}
        />
        <CourseSection
          title="Bosas"
          lessons={[
            {
              title: "PRogramavimas + humanizing",
              duration: "15 minutes",
              description: "lorem dummy text",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
            {
              title: "Live boso trackinimas",
              duration: "15 minutes",
              description: "lorem dummy text",
              videoThumbnail: "/images/about-section.jpg",
              completed: true,
            },
          ]}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
