'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { courseData } from './courseData';

type FilterType = 'all' | 'in-progress' | 'completed';

interface CourseContextType {
  completedLessons: string[]; // Array of lesson slugs
  inProgressLessons: Map<string, number>; // Map of lesson slug to progress percentage
  getProgress: () => number;
  getFilteredCourseData: (filter: FilterType) => typeof courseData;
  markLessonAsCompleted: (slug: string) => void;
  updateLessonProgress: (slug: string, progress: number) => void;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  isLessonCompleted: (slug: string) => boolean;
  getLessonProgress: (slug: string) => number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage if available
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [inProgressLessons, setInProgressLessons] = useState<Map<string, number>>(new Map());
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Load saved data on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem('completedLessons');
    const savedInProgress = localStorage.getItem('inProgressLessons');
    
    if (savedCompleted) {
      setCompletedLessons(JSON.parse(savedCompleted));
    }
    
    if (savedInProgress) {
      setInProgressLessons(new Map(JSON.parse(savedInProgress)));
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('inProgressLessons', JSON.stringify(Array.from(inProgressLessons.entries())));
  }, [inProgressLessons]);

  // Calculate overall course progress
  const getProgress = (): number => {
    const totalLessons = courseData.reduce((acc, section) => acc + section.lessons.length, 0);
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  // Filter course data based on completion status
  const getFilteredCourseData = (filter: FilterType) => {
    if (filter === 'all') {
      return courseData;
    }

    return courseData.map(section => {
      // Filter lessons based on status
      const filteredLessons = section.lessons.filter(lesson => {
        if (filter === 'completed') {
          return completedLessons.includes(lesson.slug);
        } else if (filter === 'in-progress') {
          return !completedLessons.includes(lesson.slug) && 
                 inProgressLessons.has(lesson.slug) && 
                 inProgressLessons.get(lesson.slug)! > 0;
        }
        return true;
      });

      // Return new section with filtered lessons
      return {
        ...section,
        lessons: filteredLessons
      };
    }).filter(section => section.lessons.length > 0); // Only include sections with lessons
  };

  // Mark a lesson as completed
  const markLessonAsCompleted = (slug: string) => {
    if (!completedLessons.includes(slug)) {
      setCompletedLessons(prev => [...prev, slug]);
    }
  };

  // Update lesson progress
  const updateLessonProgress = (slug: string, progress: number) => {
    // Auto-complete if progress is >= 90%
    if (progress >= 90) {
      markLessonAsCompleted(slug);
    }

    setInProgressLessons(prev => {
      const newMap = new Map(prev);
      newMap.set(slug, progress);
      return newMap;
    });
  };

  // Check if a lesson is completed
  const isLessonCompleted = (slug: string): boolean => {
    return completedLessons.includes(slug);
  };

  // Get lesson progress
  const getLessonProgress = (slug: string): number => {
    return inProgressLessons.get(slug) || 0;
  };

  const value = {
    completedLessons,
    inProgressLessons,
    getProgress,
    getFilteredCourseData,
    markLessonAsCompleted,
    updateLessonProgress,
    activeFilter,
    setActiveFilter,
    isLessonCompleted,
    getLessonProgress
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}