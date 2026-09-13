import { Category } from "@/services/categories/types";

export enum CourseStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  PUBLISHED = "PUBLISHED",
  REJECTED = "REJECTED",
}

export type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string | number;
  status: CourseStatus;
  duration: number;
  createdAt: string;

  thumbnail: {
    id: string;
    url: string;
  };

  teacher: {
    id: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      avatar: {
        id: string;
        url: string;
      } | null;
    };
  };

  categories: Category[];

  sections: Section[];
};

type Section = {
  id: string;
  order: number;
  title: string;
  lessons: Lesson[];
};

type Lesson = {
  id: string;
  order: number;
  title: string;
};

// publicId: string;
// type: string;
// resourceType: string | null;
// filename: string | null;
// size: number | null;
// mimeType: string | null;
// uploaderId: string | null;
// createdAt: string;
// updatedAt: string;
