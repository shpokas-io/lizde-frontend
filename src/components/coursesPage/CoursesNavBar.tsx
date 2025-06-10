import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/common/BackButton";
import UserMenu from "./UserMenu";

interface CoursesNavBarProps {
  backHref?: string;
  backLabel?: string;
  showBackButton?: boolean;
}

export default function CoursesNavBar({ 
  backHref = "/", 
  backLabel = "Atgal",
  showBackButton = true 
}: CoursesNavBarProps) {
  return (
    <div className="sticky top-0 z-50 bg-[#1a1a1a]/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="relative w-[100px] h-[32px]">
              <Image
                src="/images/logo-white.png"
                alt="Takadė Logo"
                width={100}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </Link>
            {showBackButton && (
              <BackButton href={backHref} label={backLabel} />
            )}
          </div>
          <UserMenu />
        </div>
      </div>
    </div>
  );
} 