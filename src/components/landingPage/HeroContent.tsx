import Button from "@/components/reusable/Button";

const HeroContent = () => {
  return (
    <div className="relative z-10 text-center text-white max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Become a Full Stack Producer, Achieve Pro-Quality Mixes and Get Paid to
        Record & Mix
      </h1>
      <Button text="Get Free Access Now" href="/free-training" />
    </div>
  );
};

export default HeroContent;
