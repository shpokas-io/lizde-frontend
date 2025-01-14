import MentorCTAButton from "./MentorCTAButton";
import MentorVideo from "./MentorVideo";

const MentorSection = () => {
  return (
    <section className="py-16 bg-white text-center">
      <div className="container mx-auto px-4">
        {/* TITLE */}
        <h2 className="text-2xl lg:text-4xl font-bold mb-8">
          Life-Changing Results THat Audio Colleges Fail to Deliver
        </h2>

        {/* Youtube Video */}
        <MentorVideo videoUrl="https://www.youtube.com/embed/example" />

        {/* CTA btn */}
        <div className="mt-6 lg:hidden">
          <MentorCTAButton />
        </div>
      </div>
    </section>
  );
};
export default MentorSection;
