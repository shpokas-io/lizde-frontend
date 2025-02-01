import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";

export const metadata = {
  title: "Lizdas",
  description: "Learn and grow with Lizdas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="pt-[60px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
