import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <NavBar />
        <main className="pt-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
