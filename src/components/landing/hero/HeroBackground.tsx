interface HeroBackgroundProps {
  imageUrl: string;
}

const HeroBackground = ({ imageUrl }: HeroBackgroundProps) => {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    />
  );
};

export default HeroBackground;
