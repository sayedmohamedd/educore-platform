import { Course } from "../courses/types";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface CategoryWithCoursesCount extends Category {
  coursesCount: number;
}

export interface CategoryWithCourses extends Category {
  courses: Course[];
}

export interface CreateCategory {
  name: string;
  description?: string;
}
