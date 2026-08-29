import StatsCard from "@/components/shared/cards/StatsCard";
import { BookOpen, CircleDollarSign, Users } from "lucide-react";
import { teachersService } from "@/services/teachers/teacher.server.service";
import StudentsTable from "./_components/StudentTable";
import { Suspense } from "react";

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledAt: string;
  coursesCount: number;
}

const StudentsPage = async () => {
  let students: Student[] = [];
  let errorMessage = "";

  try {
    const data = await teachersService.getMyStudents();
    students = data.students;
  } catch (error: unknown) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load students";
  }

  const totalStudents = students.length;

  const totalEnrollments = students.reduce(
    (total, student) => total + student.coursesCount,
    0,
  );

  const stats = [
    {
      title: "Total Students",
      number: totalStudents.toString(),
      percentage: 0,
      Icon: Users,
    },
    {
      title: "Total Enrollments",
      number: totalEnrollments.toString(),
      percentage: 0,
      Icon: BookOpen,
    },
    {
      title: "Total Revenue",
      number: "EGP 0",
      percentage: 0,
      Icon: CircleDollarSign,
    },
  ];

  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-700">Students</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and monitor students enrolled in your courses.
        </p>
      </header>

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700">My Students</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Students currently enrolled in your courses.
          </p>
        </div>

        <Suspense fallback={<h3>Loading...</h3>}>
          <StudentsTable students={students} />
        </Suspense>
      </section>
    </main>
  );
};

export default StudentsPage;
