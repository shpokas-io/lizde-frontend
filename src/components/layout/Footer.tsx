import Image from "next/image";
import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

const socialLinks = [
  { icon: FaSpotify, href: "https://spotify.com", label: "Spotify" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
];

const SocialLink = ({ icon: Icon, href, label }: typeof socialLinks[0]) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
    aria-label={label}
  >
    <Icon className="w-5 h-5" />
  </a>
);

const NewsletterForm = () => (
  <form className="space-y-3">
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-800 
                 rounded-lg focus:outline-none focus:border-orange-500 text-sm"
    />
    <button
      type="submit"
      className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 
                 rounded-lg transition-colors duration-200 text-white text-sm font-medium"
    >
      Subscribe
    </button>
  </form>
);

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          <div className="md:w-1/3">
            <Image
              src="/images/logo-white.png"
              alt="Takade Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <p className="text-sm text-gray-400 max-w-xs">
              Atrask savo unikalų skambesį ir išmok kūrti profesionalią muziką
              su mūsų pagalbą.
            </p>
          </div>

          <div className="hidden md:block md:flex-1" />

          <div className="md:w-1/3">
            <h3 className="text-orange-500 font-semibold mb-4 text-center md:text-left">
              Susisiek su mumis
            </h3>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Takade. All rights reserved.
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <SocialLink key={social.label} {...social} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
