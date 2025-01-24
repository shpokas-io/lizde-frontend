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
      className={`px-6 py-3 bg-orange-500 text-white text-lg font-bold rounded hover:bg-orange-600 transition ${className}`}
    >
      {text}
    </Link>
  );
};
export default Button;
