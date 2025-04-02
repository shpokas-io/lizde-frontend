import { ReactNode } from "react";
import { CourseProgressProvider } from "@/hooks/useCourseProgress";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <CourseProgressProvider>
          <NavBar />
          <main className="pt-[80px]">{children}</main>
          <Footer />
        </CourseProgressProvider>
      </body>
    </html>
  );
}
