/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import { coursesTabs } from "@/lib/data";
import Tabs from "./[slug]/_components/Tabs";
import IconButton from "@/components/ui/IconButton";
import { Suspense } from "react";
import CoursesList from "@/app/(public)/_components/CoursesList";
import { teachersService } from "@/services/teachers.service";
import { Role } from "@/store/auth.store";
import TablePagination from "@/components/features/dashboard/table/TablePagination";

const TeacherCourses = async () => {
  let errorMessage = "";
  let courses: any = [];
  try {
    const data = await teachersService.getMyCourses();
    courses = data.courses;
  } catch (error: any) {
    errorMessage = error?.message;
  }
  return (
    <main className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <Tabs tabs={coursesTabs} />

      <header className="my-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="mb-2 text-lg font-medium text-muted">My Courses</h3>

          <p className="text-sm text-muted-foreground">
            Manage and monitor your ongoing educational programs.
          </p>
        </div>

        <IconButton
          Icon={Plus}
          text="Create New Course"
          className="bg-primary text-white hover:bg-secondary"
          href="/teacher/courses/create"
        />
      </header>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <Suspense fallback={<h3>Loading...</h3>}>
        <CoursesList role={Role.TEACHER} courses={courses} />
      </Suspense>

      <Suspense fallback={<h3>Loading...</h3>}>
        <TablePagination />
      </Suspense>
    </main>
  );
};

export default TeacherCourses;
