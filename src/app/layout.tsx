import Navbar from "@/components/reusable/navBar/NavBar";
import "./globals.css";

export const metadata = {
  title: "Lizdas",
  description: "Learn and grow with Lizdas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
