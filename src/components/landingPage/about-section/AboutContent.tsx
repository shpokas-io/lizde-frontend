const AboutContent = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl lg:text-4xl font-bold">
        Since 2015, we&apos;ve been helping aspiring engineers master the craft
        of record production, all the way from first take to final mix.
      </h2>

      <div>
        <h3 className="text-xl font-bold mb-4">This is for you if:</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            You&apos;re an ambitious engineer/mixer who is at an intermediate
            level.
          </li>
          <li>
            You work primarily with rock genres including metal, hardcore, punk,
            pop-rock, etc.
          </li>
          <li>
            You&apos;re not getting the impact, clarity, and polish you hear on
            your favorite records.
          </li>
          <li>
            You&apos;re lacking a clear step-by-step process to finish projects
            with great results.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">We&apos;ll help you:</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            Get your mixes to competitive quality that sounds just as good as
            any record on Spotify.
          </li>
          <li>Install a workflow that provides clarity and confidence.</li>
          <li>
            Become a &quot;Full Stack Producer&quot; with skills in tracking,
            editing, and mixing.
          </li>
          <li>
            Start getting clients and grow steadily until your calendar is full
            with paid projects.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutContent;
