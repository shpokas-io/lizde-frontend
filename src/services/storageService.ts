const STORAGE_KEYS = {
  COMPLETED_LESSONS: "completedLessons",
  LAST_ACCESSED: "lastAccessed",
};

class StorageService {
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    if (!this.isLocalStorageAvailable()) {
      return defaultValue || null;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue || null;
      }
      return JSON.parse(item);
    } catch (error) {
      return defaultValue || null;
    }
  }

  set<T>(key: string, value: T): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  remove(key: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  clear(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  }

  has(key: string): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }

  keys(): string[] {
    if (!this.isLocalStorageAvailable()) {
      return [];
    }

    return Object.keys(localStorage);
  }

  size(): number {
    if (!this.isLocalStorageAvailable()) {
      return 0;
    }

    return localStorage.length;
  }
}

export const storageService = new StorageService();

export function getCompletedLessons(): string[] {
  return storageService.get<string[]>(STORAGE_KEYS.COMPLETED_LESSONS) || [];
}

export function saveCompletedLessons(completedLessons: string[]): boolean {
  return storageService.set(STORAGE_KEYS.COMPLETED_LESSONS, completedLessons);
}

export function isLessonCompleted(
  slug: string,
  completedLessons: string[]
): boolean {
  return completedLessons.includes(slug);
}

export function markLessonAsCompleted(
  slug: string,
  completedLessons: string[]
): string[] {
  if (completedLessons.includes(slug)) {
    return completedLessons;
  }

  const updatedLessons = [...completedLessons, slug];
  saveCompletedLessons(updatedLessons);
  return updatedLessons;
}

export function saveLastAccessedLesson(slug: string): boolean {
  const now = new Date().toISOString();
  return storageService.set(STORAGE_KEYS.LAST_ACCESSED, { slug, timestamp: now });
}

export function getLastAccessedLesson(): {
  slug: string;
  timestamp: string;
} | null {
  return storageService.get(STORAGE_KEYS.LAST_ACCESSED, null);
}
