"use client";

import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from '@/auth'

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isCoursePage = pathname?.startsWith("/courses");

  return (
    <>
      {!isCoursePage && <NavBar />}
      <main>{children}</main>
      {!isCoursePage && <Footer />}
    </>
  );
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-gray-200">
        <AuthProvider>
          <Toaster position="top-right" />
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
