import Link from "next/link";
import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#292f36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#26292c]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand section */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              {/* Logo section */}
              <div className="font-bold text-3xl bg-gradient-to-r from-[#292f36] to-[#1d2129] bg-clip-text text-transparent">
                TAKADE
              </div>
              <p className="text-gray-400 mt-3 text-sm text-center md:text-left">
                Atrask alternatyvios muzikos subtilybes ir išmok kurti
                profesionalų skambesį.
              </p>
            </div>
          </div>

          {/* Navigation sections - only 2 columns now */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Navigation Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#292f36]">
                Navigacija
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-gray-400 hover:text-[#292f36] transition-colors text-sm"
                  >
                    Pradžia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/courses"
                    className="text-gray-400 hover:text-[#292f36] transition-colors text-sm"
                  >
                    Kursai
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-[#292f36] transition-colors text-sm"
                  >
                    Apie Mus
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#292f36]">
                Kontaktai
              </h4>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm">
                  El. paštas:{" "}
                  <span className="text-[#292f36]/80">info@takade.lt</span>
                </li>
                <li className="text-gray-400 text-sm">
                  Tel.:{" "}
                  <span className="text-[#292f36]/80">+370 600 00000</span>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-[#292f36] transition-colors text-sm"
                  >
                    Privatumo Politika
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-900">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Takade. Visos teisės saugomos.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#292f36] transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#292f36] transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#292f36] transition-colors"
              >
                <FaSpotify className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
