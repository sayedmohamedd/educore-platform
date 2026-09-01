/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, Clock3, GraduationCap, PlayCircle } from "lucide-react";
import { Suspense } from "react";
import MyCoursesList from "./_components/MyCoursesList";
import EmptyCoursesState from "./_components/quiz/EmptyCoursesState";
import StudentStatCard from "./_components/StudentStatCard";
import { studentServerService } from "@/services/students/student.server.service";
import { Enrollment } from "@/services/courses/types";

const MyCourses = async () => {
  let enrollments: Enrollment[] = [];
  let errorMessage = "";
  try {
    const data = await studentServerService.getMyCourses();
    enrollments = data.enrollments;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load courses";
  }

  const totalCourses = enrollments.length;

  const completedCourses = enrollments.filter(
    (enrollment: any) => enrollment.course.progress === 100,
  ).length;

  // const inProgressCourses = courses.filter(
  //   (course) => course.progress > 0 && course.progress < 100,
  // ).length;

  // const totalLessons = courses.reduce(
  //   (total, course) => total + course.totalLessons,
  //   0,
  // );

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-700">My Courses</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Continue learning and keep track of your progress.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StudentStatCard
          Icon={BookOpen}
          title="Enrolled Courses"
          value={totalCourses}
        />
        <StudentStatCard
          Icon={PlayCircle}
          title="In Progress"
          // value={inProgressCourses}
        />
        <StudentStatCard
          Icon={GraduationCap}
          title="Completed"
          value={completedCourses}
        />
        <StudentStatCard
          Icon={Clock3}
          title="Total Lessons"
          // value={totalLessons}
        />
      </section>

      {/* Courses */}
      <section className="mt-8">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-700">Your Courses</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Pick up where you left off.
          </p>
        </div>

        {/* Empty state */}
        {enrollments.length === 0 && <EmptyCoursesState />}

        {errorMessage && <div>{errorMessage}</div>}

        {/* Courses list */}
        <Suspense fallback={<div>Loading...</div>}>
          <MyCoursesList enrollments={enrollments} />
        </Suspense>
      </section>
    </main>
  );
};

export default MyCourses;

// const courses: Course[] = [
//   {
//     id: "1",
//     title: "Complete React & Next.js Course",
//     instructor: "Ahmed Mohamed",
//     progress: 72,
//     lessonsCompleted: 18,
//     totalLessons: 25,
//     duration: "12h 30m",
//     image:
//       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
//   },
//   {
//     id: "2",
//     title: "Node.js & NestJS Backend Development",
//     instructor: "Mohamed Ali",
//     progress: 45,
//     lessonsCompleted: 9,
//     totalLessons: 20,
//     duration: "10h 15m",
//     image:
//       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
//   },
//   {
//     id: "3",
//     title: "PostgreSQL & Database Design",
//     instructor: "Omar Hassan",
//     progress: 100,
//     lessonsCompleted: 16,
//     totalLessons: 16,
//     duration: "7h 40m",
//     image:
//       "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
//   },
// ];
