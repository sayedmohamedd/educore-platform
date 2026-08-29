/* eslint-disable @typescript-eslint/no-explicit-any */
import TablePagination from "@/components/features/dashboard/table/TablePagination";
import TeachersList from "./_components/TeachersList";
import { Suspense } from "react";
import { teachersService } from "@/services/teachers/teacher.server.service";

// const teachers = [
//   {
//     id: "1",
//     user: {
//       fullName: "Ahmed Hassan",
//       avatar: {
//         url: "https://placehold.co/200x200",
//       },
//     },
//     title: "Senior Backend Instructor",
//     bio: "Full Stack Developer and Backend Engineer.",
//     expertise: "NestJS, Node.js, PostgreSQL, Prisma",
//     _count: {
//       courses: 5,
//     },
//   },
//   {
//     id: "2",
//     user: {
//       fullName: "Mohamed Ali",
//       avatar: {
//         url: "https://placehold.co/200x200",
//       },
//     },
//     title: "Frontend Instructor",
//     bio: "Frontend developer specialized in modern React applications.",
//     expertise: "React, Next.js, TypeScript",
//     _count: {
//       courses: 3,
//     },
//   },
//   {
//     id: "3",
//     user: {
//       fullName: "Omar Mohamed",
//       avatar: {
//         url: "https://placehold.co/200x200",
//       },
//     },
//     title: "Database Instructor",
//     bio: "Database specialist focused on designing scalable systems.",
//     expertise: "PostgreSQL, SQL, Database Design",
//     _count: {
//       courses: 4,
//     },
//   },
//   {
//     id: "4",
//     user: {
//       fullName: "Youssef Ahmed",
//       avatar: {
//         url: "https://placehold.co/200x200",
//       },
//     },
//     title: "Web Development Instructor",
//     bio: "Passionate about teaching modern web development.",
//     expertise: "JavaScript, React, Node.js",
//     _count: {
//       courses: 6,
//     },
//   },
// ];

const meta = {
  total: 3,
  page: 1,
  lastPage: 1,
};

const Teachers = async () => {
  let errorMessage = "";
  let teachers: any = [];

  try {
    const data = await teachersService.getTeachers();
    teachers = data.teachers;
  } catch (error: any) {
    errorMessage = error?.message;
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container">
        {/* Header */}
        <header className="mb-8">
          <h1 className="page-title text-muted-foreground">مدرسينا</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            تعرف على نخبة من المدرسين والخبراء وابدأ رحلة التعلم معهم.
          </p>
        </header>

        {/* Teachers */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Suspense fallback={<div>Loading Teachers...</div>}>
          <TeachersList teachers={teachers} />
        </Suspense>

        {/* Pagination */}
        <Suspense fallback={<div>Loading...</div>}>
          <TablePagination meta={meta} />
        </Suspense>
      </div>
    </section>
  );
};

export default Teachers;
