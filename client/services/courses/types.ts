export type CreateCourse = {
  title: string;
  description?: string;
  price: number;
  thumbnail?: string;
  categoryIds?: string[];
};

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  teacherId: string;
  thumbnailId: string;
  createdAt: string;
  updatedAt: string;

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
