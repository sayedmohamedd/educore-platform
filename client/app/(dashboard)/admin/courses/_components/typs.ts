export type CourseStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "PUBLISHED"
  | "REJECTED";

export type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string;
  status: CourseStatus;
  duration: number;
  createdAt: string;

  thumbnail: {
    id: string;
    url: string;
  } | null;

  teacher: {
    id: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      avatar: {
        id: string;
        url: string;
        publicId: string;
        type: string;
        resourceType: string | null;
        filename: string | null;
        size: number | null;
        mimeType: string | null;
        uploaderId: string | null;
        createdAt: string;
        updatedAt: string;
      } | null;
    };
  };

  categories: {
    category: {
      id: string;
      name: string;
      slug: string;
    };
  }[];

  sections: {
    id: string;
    title: string;
    order: number;

    lessons: {
      id: string;
      title: string;
      order: number;
    }[];
  }[];
};
