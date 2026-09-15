import { Suspense } from "react";
import { AdminCourse } from "./_components/types";
import { Meta } from "@/services/helpers";
import CoursesStats from "./_components/CoursesStats";
import TableSkeleton from "@/components/shared/Table/TableSkeleton";
import CoursesTable from "./_components/CoursesTable";
import { adminServerService } from "@/services/admin/admin.server.service";
import StatsSkeleton from "../_components/StatsSkeleton";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const AdminCoursesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  let isLoading: boolean = true;
  let courses: AdminCourse[] = [];
  let meta: Meta = {} as Meta;
  try {
    isLoading = true;
    const response = await adminServerService.getAdminCourses(
      {
        page: Number(params.page) || 1,
        ...(params.search && { search: params.search }),
        ...(params.status && { status: params.status }),
      },
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      },
    );
    courses = response.courses;
    meta = response.meta;
  } catch (error) {
    isLoading = false;
    console.error(error);
  } finally {
    isLoading = false;
  }
  return (
    <section className="px-4 py-4 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Courses</h1>
        <p className="text-sm text-muted-foreground">
          Manage and review courses submitted by teachers.
        </p>
      </header>

      <Suspense fallback={<StatsSkeleton />}>
        <CoursesStats courses={courses} />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <CoursesTable courses={courses} meta={meta} isLoading={isLoading} />
      </Suspense>
    </section>
  );
};

export default AdminCoursesPage;
