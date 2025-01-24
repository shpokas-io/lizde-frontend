import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ href }: { href: string }) => {
  return (
    <Link href={href}>
      <a className="flex items-center text-gray-600 hover:text-gray-800 text-sm font-medium">
        <FaArrowLeft className="mr-2" />
        Back to Home
      </a>
    </Link>
  );
};

export default BackButton;
