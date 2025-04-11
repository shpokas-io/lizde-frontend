import { ReactNode } from "react";
import { CourseProgressProvider } from "@/hooks/useCourseProgress";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-gray-200">
        <CourseProgressProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </CourseProgressProvider>
      </body>
    </html>
  );
}
