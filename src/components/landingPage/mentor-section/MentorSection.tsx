import MentorCTAButton from "./MentorCTAButton";
import MentorVideo from "./MentorVideo";

const MentorSection = () => {
  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        {/* TITLE */}
        <h2 className="text-3xl lg:text-4xl text-black font-bold mb-8">
          A word from Lizde Mentors
        </h2>

        {/* Youtube Video */}
        <MentorVideo videoUrl="https://www.youtube.com/watch?v=9Q_4vUDimdI" />

        {/* CTA btn */}
        <div className="mt-10 lg:hidden">
          <MentorCTAButton />
        </div>
      </div>
    </section>
  );
};
export default MentorSection;
