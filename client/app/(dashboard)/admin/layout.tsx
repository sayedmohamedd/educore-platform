"use client";

import { useState } from "react";
import DashboardHeader from "@/components/features/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/features/dashboard/DashboardSidebar";
import { Role } from "@/store/auth.store";

const AdminDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar
        role={Role.ADMIN}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-w-0 flex-1">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        {children}
      </main>
    </div>
  );
};

export default AdminDashboardLayout;

// import DashboardHeader from "@/components/features/dashboard/DashboardHeader";
// import DashboardSidebar from "@/components/features/dashboard/DashboardSidebar";
// import { Role } from "@/store/auth.store";

// const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="flex">
//       <DashboardSidebar role={Role.ADMIN} />
//       <main className="flex-1 min-h-screen">
//         <DashboardHeader />
//         {children}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboardLayout;
