import Button from "../reusable/Button";

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/shaded.png')" }}
    >
      {/* TODO: Find better solution for below comment  */}
      {/* Aspect Ratio or Padding-Based Height */}
      <div className="pt-[70%] sm:pt-[60%] md:pt-[30%] lg:pt-[25%] relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Become a Sound Engineer
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Achieve professional-quality recordings and elevate your sound
            engineering skills with expert guidance.
          </p>
          <Button text="Explore Courses" href="/courses" />
        </div>
      </div>
    </section>
  );
}
