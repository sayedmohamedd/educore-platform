export type Teacher = {
  id: string;
  user: {
    fullName: string;
    avatar: {
      url: string;
    } | null;
  };
  title: string | null;
  bio: string | null;
  expertise: string | null;
  _count: {
    courses: number;
  };
};

export interface Enrollment {
  id: string;
  course: { title: string };
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  enrolledAt: string;
}
