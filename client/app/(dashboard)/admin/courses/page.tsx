import { adminServerService } from "@/services/admin/admin.server.service";
import AdminCourses from "./_components/AdminCourses";
import { Suspense } from "react";
import { AdminCourse } from "./_components/typs";

const AdminCoursesPage = async () => {
  let courses: AdminCourse[] = [];
  try {
    const response = await adminServerService.getAdminCourses();
    courses = response.courses;
  } catch (error) {
    console.log(error);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminCourses courses={courses} />
    </Suspense>
  );
};

export default AdminCoursesPage;
