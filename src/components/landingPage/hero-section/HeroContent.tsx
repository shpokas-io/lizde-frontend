import Button from "@/components/common/Button";

const HeroContent = () => {
  return (
    <div className="relative z-10 text-center text-white max-w-2xl mx-auto flex flex-col items-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        Tavo garsai<br></br>Tavo taisyklės<br></br>Mūsų žinios
      </h1>
      <Button text="Pradėk dabar" href="/courses" />
    </div>
  );
};

export default HeroContent;
