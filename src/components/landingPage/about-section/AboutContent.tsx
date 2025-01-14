import Button from "@/components/reusable/Button";

const AboutContent = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl lg:text-4xl font-bold">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        obcaecati veniam temporibus recusandae ipsa quas cupiditate.
      </h2>

      <div>
        <h3 className="text-xl font-bold mb-4">This is for you if:</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
          <li>Lorem, ipsum dolor sit amet consectetur.</li>
          <li>
            Lorem, ipsum dolor sit amet consectetur.ipsum dolor sit amet
            consectetur.
          </li>
          <li>ipsum dolor sit amet consectetur.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">We&apos;ll help you:</h3>
        <ul className="space-y-2 list-disc list-inside">
          <li>Get your mixes to competitive quality.</li>
          <li>Install a workflow that provides clarity and confidence.</li>
          <li>
            Become a &quot;Full Stack Producer&quot; with skills in tracking,
            editing, and mixing.
          </li>
          <li>Start getting clients and grow steadily with paid projects.</li>
        </ul>
      </div>
      {/* TODO: BUtton should be last element of the section , no it is not */}
      {/* CTA */}
      <Button
        text="Get Started with a Free Class"
        href="/free-class"
        className="mt-4"
      />
    </div>
  );
};

export default AboutContent;
