import AboutSection from "@/components/landingPage/about-section/AboutSection";
import HeroSection from "@/components/landingPage/hero-section/HeroSection";
import MentorSection from "@/components/landingPage/mentor-section/MentorSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <MentorSection />
    </div>
  );
}
