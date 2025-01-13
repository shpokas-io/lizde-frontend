import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  return (
    <Link href={href} className="text-gray-800 hover:text-gray-600 font-medium">
      {label}
    </Link>
  );
};
export default NavItem;
