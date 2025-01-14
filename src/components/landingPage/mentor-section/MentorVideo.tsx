interface MentorVideoProps {
  videoUrl: string;
}

const MentorVideo = ({ videoUrl }: MentorVideoProps) => {
  return (
    <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={videoUrl}
        title="Mentor Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default MentorVideo;
