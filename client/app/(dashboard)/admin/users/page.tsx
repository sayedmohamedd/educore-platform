import Table from "@/components/features/dashboard/table/Table";
import { Column } from "@/components/features/dashboard/table/types";
import StatsCard from "@/components/shared/cards/StatsCard";
import IconButton from "@/components/ui/IconButton";
import { adminServerService } from "@/services/admin/admin.server.service";
import { User } from "@/services/admin/types";
import { Download, Users2 } from "lucide-react";
import { Suspense } from "react";

const stats = [
  {
    title: "Total Users",
    number: "11,749",
    percentage: 12.5,
    Icon: Users2,
  },
  {
    title: "Students",
    number: "11,185",
    percentage: 12.5,
    Icon: Users2,
  },
  {
    title: "Teachers",
    number: "564",
    percentage: 17.8,
    Icon: Users2,
  },
  {
    title: "Admins",
    number: "3",
    percentage: 0,
    Icon: Users2,
  },
];

const Users = async () => {
  let users: User[] = [];
  let errorMessage: string = "";
  try {
    const data = await adminServerService.getAllUsers();
    users = data.users;
    console.log("Fetched users data:", users);
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to fetch users data.";
  }

  const usersColumns: Column<User>[] = [
    {
      header: "Full Name",
      accessorKey: "fullName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Joined Date",
      accessorKey: "createdAt",
    },
  ];

  return (
    <main className="mb-6 px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-muted">
            Admin / <span className="text-primary">Users Management</span>
          </p>

          <p className="paragraph">
            Manage your students, instructors, and system administrators.
          </p>
        </div>

        <IconButton
          className="w-fit bg-white text-slate-700 hover:bg-slate-50"
          text="Export Report"
          Icon={Download}
        />
      </header>
      {/* Stats */}
      <section className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>
      {/* Error */}
      {errorMessage && (
        <div
          className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* Users Table */}
      <section>
        <Suspense fallback={<div>Loading users...</div>}>
          <Table data={users} columns={usersColumns} showFilter />
        </Suspense>
      </section>
    </main>
  );
};

export default Users;
