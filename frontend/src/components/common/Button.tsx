import Link from "next/link";

interface ButtonProps {
  text: string;
  href: string;
  className?: string;
}

const Button = ({ text, href, className = "" }: ButtonProps) => {
  return (
    <Link
      href={href}
      className={`px-6 py-3 bg-[#343b43] text-white text-lg font-bold rounded hover:bg-[#292f36] transition ${className}`}
    >
      {text}
    </Link>
  );
};
export default Button;
