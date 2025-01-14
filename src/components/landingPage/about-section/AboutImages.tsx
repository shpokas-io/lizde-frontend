const AboutImage = () => {
  return (
    // TODO: images should go after contet, now it goes one after another
    <div className="flex flex-col space-y-4">
      <img
        src="/images/about-section.jpg"
        alt="Alt text for image"
        className="rounded-lg shadow-lg"
      />
      <img
        src="/images/about-section.jpg"
        alt="Alt text for image"
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};
export default AboutImage;
