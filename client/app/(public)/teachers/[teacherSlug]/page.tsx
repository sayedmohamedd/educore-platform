/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, UserRound } from "lucide-react";

import CourseCard from "@/components/shared/cards/CourseCard";
import { teachersService } from "@/services/teachers/teacher.server.service";

// const teacher = {
//   id: "1",
//   user: {
//     fullName: "Ahmed Hassan",
//     avatar: {
//       url: "https://placehold.co/200x200",
//     },
//   },
//   title: "Senior Backend Instructor",
//   bio: "Full Stack Developer and Backend Engineer with a passion for building scalable applications and teaching modern backend technologies.",
//   expertise: "NestJS, Node.js, PostgreSQL, Prisma",
//   _count: {
//     courses: 5,
//   },
// };

// const courses = [
//   {
//     id: "1",
//     title: "NestJS Backend Development",
//     description:
//       "Build production-ready REST APIs using NestJS, Prisma and PostgreSQL.",
//     status: "PUBLISHED",
//   },
//   {
//     id: "2",
//     title: "Advanced Node.js",
//     description:
//       "Learn advanced backend concepts and build scalable Node.js applications.",
//     status: "PUBLISHED",
//   },
//   {
//     id: "3",
//     title: "PostgreSQL for Backend Developers",
//     description:
//       "Master PostgreSQL and database design for modern backend applications.",
//     status: "PUBLISHED",
//   },
// ];

const TeacherProfile = async ({
  params,
}: {
  params: Promise<{ teacherSlug: string }>;
}) => {
  const { teacherSlug } = await params;
  let errorMessage = "";
  let teacher: any = [];
  try {
    teacher = await teachersService.getTeacher(teacherSlug);
  } catch (error: any) {
    errorMessage = error?.message;
  }
  return (
    <section className="py-8 sm:py-12">
      <div className="container">
        {/* Back */}
        <Link
          href="/teachers"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowRight size={17} />
          Back to Teachers
        </Link>

        {/* Teacher Header */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-primary/5 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-start">
              {/* Avatar */}
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm">
                <Image
                  src={"/mentors/sayed.jpeg"}
                  alt={teacher.user.fullName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-slate-700 sm:text-3xl">
                  {teacher.user.fullName}
                </h1>

                {teacher.title && (
                  <p className="mt-2 font-medium text-primary">
                    {teacher.title}
                  </p>
                )}

                {teacher.expertise && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {teacher.expertise}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex border-t border-slate-100">
            <div className="flex flex-1 items-center justify-center gap-2 px-6 py-5">
              <BookOpen size={18} className="text-primary" />

              <div>
                <p className="font-semibold text-slate-700">
                  {teacher._count.courses}
                </p>

                <p className="text-xs text-muted-foreground">
                  Published Courses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <UserRound size={19} className="text-primary" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-700">
                About the Instructor
              </h2>

              <p className="text-xs text-muted-foreground">
                Learn more about this instructor.
              </p>
            </div>
          </div>

          <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
            {teacher.bio}
          </p>
        </section>

        {/* Courses */}
        <section className="mt-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-700">
              Courses by {teacher.user.fullName}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Explore the courses created by this instructor.
            </p>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teacher.courses.map((course: any) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                status={course.status}
                thumbnailId={course.thumbnailId}
                price={course.price}
                actions={
                  <Link
                    href={`/courses/${course.id}`}
                    className="block w-full rounded-xl bg-primary py-2.5 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    View Course
                  </Link>
                }
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default TeacherProfile;

// import TeacherBio from "@/app/(public)/teachers/_components/TeacherBio";
// import TeacherCourses from "@/app/(public)/teachers/_components/TeacherCourses";
// import TeacherHero from "@/app/(public)/teachers/_components/TeacherHero";
// import TeacherStats from "@/app/(public)/teachers/_components/TeacherStats";

// const TeacherProfilePage = () => {
//   return (
//     <main className="relative overflow-hidden bg-[#ecedf9]">
//       {/* Background */}
//       <div className="absolute inset-0 -z-10 ">
//         <div className="absolute right-0 top-0 h-112.5 w-112.5 rounded-full bg-primary/5 blur-3xl" />
//         <div className="absolute bottom-0 left-0 h-100 w-100 rounded-full bg-violet-500/5 blur-3xl" />
//       </div>

//       <div className="container py-12 space-y-16">
//         {/* Hero */}
//         <TeacherHero />

//         {/* About + Stats */}
//         <section className="grid gap-8 lg:grid-cols-12">
//           <div className="lg:col-span-8 h-full">
//             <TeacherBio />
//           </div>

//           <aside className="lg:col-span-4">
//             <TeacherStats />
//           </aside>
//         </section>

//         {/* Courses */}
//         <TeacherCourses />
//       </div>
//     </main>
//   );
// };

// export default TeacherProfilePage;
