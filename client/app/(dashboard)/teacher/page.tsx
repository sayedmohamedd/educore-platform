import { Suspense } from "react";
import TeacherDashboard from "./_components/TeacherDashboardPage";
import { teachersService } from "@/services/teachers/teacher.server.service";
export const dynamic = "force-dynamic";
const TeacherHomePage = async () => {
  let statistics = [];
  try {
    statistics = await teachersService.getMyStatistics();
  } catch (error) {
    console.log(error);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeacherDashboard statistics={statistics} />
    </Suspense>
  );
};

export default TeacherHomePage;
