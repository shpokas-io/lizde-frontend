import NavItem from "./NavItem";

interface BurgerMenuProps {
  links: { href: string; label: string }[];
}

const BurgerMenu = ({ links }: BurgerMenuProps) => {
  return (
    <div className="md:hidden bg-white shadow-md">
      <nav className="flex flex-col space-y-4 p-4">
        {links.map((link) => (
          <NavItem key={link.href} href={link.href} label={link.label} />
        ))}
      </nav>
    </div>
  );
};
export default BurgerMenu;
