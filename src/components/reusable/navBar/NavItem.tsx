import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  return (
    <Link href={href}>
      <a className="text-gray-800 hover:text-gray-600 font-medium">{label}</a>
    </Link>
  );
};
export default NavItem;
