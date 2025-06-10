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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Logo and Back Button */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0 flex-1">
            <Link href="/" className="relative w-[80px] h-[26px] sm:w-[100px] sm:h-[32px] flex-shrink-0">
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
              <div className="min-w-0">
                <BackButton 
                  href={backHref} 
                  label={backLabel}
                  className="hidden sm:inline-flex"
                />
                {/* Mobile back button - icon only */}
                <BackButton 
                  href={backHref} 
                  label=""
                  className="sm:hidden text-sm"
                />
              </div>
            )}
          </div>
          
          {/* Right section - User Menu */}
          <div className="flex-shrink-0">
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
} 