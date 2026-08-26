import DashboardHeader from "@/components/features/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/features/dashboard/DashboardSidebar";
import { Role } from "@/store/auth.store";

const TeacherDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex">
      <DashboardSidebar role={Role.TEACHER} />
      <main className="flex-1 min-h-screen">
        <DashboardHeader />
        {children}
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;
