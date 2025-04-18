import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
  icon?: React.ReactNode;
}

const BackButton = ({
  href,
  label = "Back",
  className = "",
  icon = <FaArrowLeft className="h-4 w-4" />,
}: BackButtonProps) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-base font-medium text-gray-700 
                 hover:text-gray-900 transition-colors ${className}`}
    >
      {icon}
      {label}
    </Link>
  );
};

export default BackButton;
