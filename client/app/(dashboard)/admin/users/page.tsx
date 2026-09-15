import IconButton from "@/components/ui/IconButton";
import { Meta } from "@/services/helpers";
import { adminServerService } from "@/services/admin/admin.server.service";
import { User } from "@/services/admin/types";
import { Download } from "lucide-react";
import Stats from "./_components/Stats";
import UsersTable from "./_components/UsersTable";
import { Suspense } from "react";
import TableSkeleton from "@/components/shared/Table/TableSkeleton";

const Users = async () => {
  let users: User[] = [];
  let meta: Meta = {} as Meta;

  try {
    const data = await adminServerService.getAllUsers();
    users = data.users;
    meta = data.meta;
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="mb-6 px-4 py-4 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

      <Suspense fallback={<div>Loading...</div>}>
        <Stats users={users} />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <UsersTable users={users} meta={meta} />
      </Suspense>
    </main>
  );
};

export default Users;
