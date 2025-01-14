import Button from "@/components/reusable/Button";

const HeroContent = () => {
  return (
    <div className="relative z-10 text-center text-white max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </h1>
      <Button text="Lorem ipsum" href="/free-training" />
    </div>
  );
};

export default HeroContent;
