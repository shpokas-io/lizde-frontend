import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import { CourseProvider } from "./lib/CourseContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <CourseProvider>
          <NavBar />
          <main className="pt-[80px]">{children}</main>
          <Footer />
        </CourseProvider>
      </body>
    </html>
  );
}
