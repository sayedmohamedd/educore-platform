import { adminServerService } from "@/services/admin/admin.server.service";
import AdminCourses from "./_components/AdminCourses";
import { Suspense } from "react";
import { AdminCourse } from "./_components/types";
import { Meta } from "@/services/helpers";

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
    <Suspense fallback={<div>Loading...</div>}>
      <AdminCourses courses={courses} meta={meta} isLoading={isLoading} />
    </Suspense>
  );
};

export default AdminCoursesPage;
