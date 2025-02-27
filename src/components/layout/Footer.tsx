import Link from "next/link";
import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1d21] text-gray-200 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#292f36]/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#292f36]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-bold text-3xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              TAKADE
            </div>
            <p className="text-gray-400 mt-2 text-sm text-center md:text-left max-w-xs">
              Atrask alternatyvios muzikos subtilybes ir išmok kurti
              profesionalų skambesį.
            </p>
          </div>

          {/* Simple Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-3 text-white">
              Navigacija
            </h4>
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Pradžia
              </Link>
              <Link
                href="/courses"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Kursai
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Apie Mus
              </Link>
            </div>
          </div>

          {/* Contact info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-3 text-white">Kontaktai</h4>
            <div className="flex flex-col space-y-2">
              <p className="text-gray-400 text-sm">
                El. paštas:{" "}
                <span className="text-gray-300">info@takade.lt</span>
              </p>
              <p className="text-gray-400 text-sm">
                Tel.: <span className="text-gray-300">+370 600 00000</span>
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaSpotify className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Takade. Visos teisės saugomos.
          </p>
          <Link
            href="/privacy"
            className="text-gray-500 hover:text-white transition-colors text-sm mt-2 md:mt-0"
          >
            Privatumo Politika
          </Link>
        </div>
      </div>
    </footer>
  );
}
