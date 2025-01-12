import Link from "next/link";

export default function Button({
  text,
  href,
  className = "",
}: {
  text: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`px-6 py-3 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition-colors ${className}`}
    >
      {text}
    </Link>
  );
}
