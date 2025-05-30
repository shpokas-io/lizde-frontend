"use client";

import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from '@/contexts/AuthContext'
import AuthDebug from '@/components/debug/AuthDebug'

const toastConfig = {
  position: "top-center" as const,
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
};

const ClientLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isCoursePage = pathname?.startsWith("/courses");

  return (
    <>
      {!isCoursePage && <NavBar />}
      <main>{children}</main>
      <Footer />
      <AuthDebug />
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
