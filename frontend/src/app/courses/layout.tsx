"use client";

import { ReactNode } from "react";
import { CourseProvider } from "@/components/lib/CourseContext";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return <CourseProvider>{children}</CourseProvider>;
} 