import { teachersService } from "@/services/teachers/teacher.server.service";
import StudentsTable from "./_components/StudentsTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/shared/Table/TableSkeleton";
import { Meta } from "@/services/helpers";
import StudentsStats from "./_components/StudentsStats";
import StatsSkeleton from "../../admin/_components/StatsSkeleton";

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledAt: string;
  coursesCount: number;
}

const StudentsPage = async () => {
  let students: Student[] = [];
  let meta: Meta = {} as Meta;
  try {
    const data = await teachersService.getMyStudents();
    students = data.students;
    meta = data.meta;
  } catch (error: unknown) {
    console.error(error);
  }

  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-700">Students</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and monitor students enrolled in your courses.
        </p>
      </header>

      <Suspense fallback={<StatsSkeleton />}>
        <StudentsStats students={students} />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <StudentsTable students={students} meta={meta} />
      </Suspense>
    </main>
  );
};

export default StudentsPage;
