"use client";

import { ReactNode } from "react";
import { CourseProvider } from "@/contexts/CourseContext";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return <CourseProvider>{children}</CourseProvider>;
}
