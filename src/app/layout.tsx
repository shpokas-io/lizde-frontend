"use client";

import { ReactNode } from "react";
import { CourseProgressProvider } from "@/hooks/useCourseProgress";
import { AuthProvider } from "@/contexts/AuthContext";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");
  const isCoursePage = pathname?.startsWith("/courses");
  const shouldShowNavbar = !isAuthPage && !isCoursePage;

  return (
    <>
      {shouldShowNavbar && <NavBar />}
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-gray-200">
        <AuthProvider>
          <CourseProgressProvider>
            <Toaster 
              position="top-center"
              toastOptions={{
                style: {
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 4000,
                },
              }}
            />
            <ClientLayout>{children}</ClientLayout>
          </CourseProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
