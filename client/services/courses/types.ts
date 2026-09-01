export type CreateCourse = {
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  thumbnailId?: string;
  categoryIds: string[];
};

export type UpdateCourse = {
  title?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  thumbnailId?: string;
  categoryIds?: string[];
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  duration: number;
  description: string;
  price: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  teacherId: string;
  thumbnailId: string;
  createdAt: string;
  updatedAt: string;
  sections?: Section[];
  teacher?: {
    id: string;
    bio: string;
    title: string;
    expertise: string;
    user: {
      id: string;
      fullName: string;
      avatar: {
        url: string;
      };
    };
  };
  categories: Category[];
  rating?: number;
  totalLessons?: number;
};

export type Enrollment = {
  id: string;
  createdAt: string;
  course: Course;
};

export type Category = {
  id: string;
  name: string;
};

export type Meta = {
  total: number;
  page: number;
  lastPage: number;
};

export type CoursesData = {
  courses: Course[];
  meta?: Meta;
};

type Lesson = {
  id: string;
  title: string;
  description?: string | null;
  videoId?: string | null;
  videoUrl?: string | null;
  duration: number;
  order: number;
  isFree: boolean;
};

type Section = {
  id: string;
  title: string;
  slug: string;
  order: number;
  lessons: Lesson[];
};
