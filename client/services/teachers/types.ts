export type Teacher = {
  id: string;
  title: string;
  bio: string;
  expertise: string;
  phone?: string;
  createdAt?: string;
  user: {
    fullName: string;
    avatar: {
      url: string;
    };
  };
  _count?: {
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

// export type Teacher = {
//   id: string;
//   userId: string;
//   bio: string;
//   title: string;
//   expertise: string;
//   phone: string;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   user: {
//     id: string;
//     fullName: string;
//     email: string;
//   };
// };
