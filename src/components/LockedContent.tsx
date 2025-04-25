import { FaLock } from "react-icons/fa";
import Link from "next/link";

interface LockedContentProps {
  title: string;
  description: string;
}

export default function LockedContent({ title, description }: LockedContentProps) {
  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 p-8 my-8 text-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
          <FaLock className="w-8 h-8 text-orange-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">{description}</p>
        <Link
          href="/auth/login"
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Sign In to Access
        </Link>
      </div>
    </div>
  );
} 