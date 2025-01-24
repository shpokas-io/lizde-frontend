import Button from "@/components/common/Button";

const AboutSection = () => {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8 space-y-8">
        {/* First Block: Text followed by Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text */}
          <div>
            <h3 className="text-xl font-bold mb-4">This is for you if:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                You&apos;re an ambitious engineer/mixer who is at an
                intermediate or semi-professional level.
              </li>
              <li>
                You work primarily with rock genres including metal, hardcore,
                punk, pop-rock, etc.
              </li>
              <li>
                You&apos;re not getting the impact, clarity, and polish that you
                hear on your favorite records.
              </li>
              <li>
                You&apos;re lacking a clear step-by-step process to finish
                projects on time with consistently great results.
              </li>
              <li>
                You&apos;ve hit a wall after years of trying to teach yourself
                with free content online.
              </li>
            </ul>
          </div>
          {/* Image */}
          <img
            src="/images/about-section.jpg"
            alt="Engineer recording drums"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Second Block: Image followed by Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <img
            src="/images/about-section.jpg"
            alt="Engineer working in studio"
            className="rounded-lg shadow-lg lg:order-1 pt-40"
          />
          {/* Text */}
          <div>
            <h3 className="text-xl font-bold mb-4">We&apos;ll help you:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                Get your mixes to a competitive quality that sounds just as good
                as any record on Spotify.
              </li>
              <li>
                Install a workflow that provides clarity and confidence—no more
                second-guessing, spending months on a mix, or going back to
                YouTube.
              </li>
              <li>
                Become a &quot;Full Stack Producer&quot; with elite skills in
                tracking, editing, and mixing.
              </li>
              <li>
                Start getting clients in the door and grow steadily until your
                calendar is full with paid projects.
              </li>
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="text-center">
          <Button
            text="Get Started with a Free Class"
            href="/free-class"
            className="bg-orange-500 text-white text-lg font-bold py-4 px-6 rounded-lg hover:bg-orange-600 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
