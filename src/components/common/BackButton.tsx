import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  href: string;
  label?: string;
}

const BackButton = ({ href, label = "Back" }: BackButtonProps) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-base font-medium text-gray-700 
                 hover:text-gray-900 transition-colors"
    >
      <FaArrowLeft />
      {label}
    </Link>
  );
};

export default BackButton;
