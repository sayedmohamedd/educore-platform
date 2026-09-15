import { Plus } from "lucide-react";
import Tabs from "./[slug]/_components/Tabs";
import IconButton from "@/components/ui/IconButton";
import { Suspense } from "react";
import CoursesList from "@/app/(public)/_components/CoursesList";
import { teachersService } from "@/services/teachers/teacher.server.service";
import { Role } from "@/store/auth.store";
import TablePagination from "@/components/features/dashboard/table/TablePagination";
import { Course } from "@/services/courses/types";
import CoursesListSkeleton from "@/components/shared/cards/CoursesListSkeleton";

const TeacherCourses = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  let courses: Course[] = [];
  try {
    const data = await teachersService.getMyCourses(params);
    courses = data.courses;
  } catch (error: unknown) {
    console.error(error);
  }
  return (
    <main className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <Tabs />

      <header className="my-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="mb-2 text-lg font-medium text-muted text-right">
            My Courses
          </h3>

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

      <Suspense fallback={<CoursesListSkeleton />}>
        <CoursesList role={Role.TEACHER} courses={courses} />
      </Suspense>

      <Suspense fallback={<h3>Loading...</h3>}>
        <TablePagination />
      </Suspense>
    </main>
  );
};

export default TeacherCourses;
