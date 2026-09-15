"use client";
import Table from "@/components/shared/Table/Table";
import { Column, TableFilter } from "@/components/shared/Table/types";

import { User } from "@/services/admin/types";
import { Meta } from "@/services/helpers";

type UserRole = "" | User["role"];

const UsersTable = ({ users, meta }: { users: User[]; meta: Meta }) => {
  const filters: TableFilter<UserRole>[] = [
    {
      key: "role",
      label: "Role",
      options: [
        {
          value: "",
          label: "All Roles",
        },
        {
          value: "STUDENT" as User["role"],
          label: "Students",
        },
        {
          value: "INSTRUCTOR" as User["role"],
          label: "Teachers",
        },
        {
          value: "ADMIN" as User["role"],
          label: "Admins",
        },
      ],
    },
  ];

  const roleLabels: Record<User["role"], string> = {
    STUDENT: "Student",
    INSTRUCTOR: "Teacher",
    ADMIN: "Admin",
  };

  const roleClasses: Record<User["role"], string> = {
    STUDENT: "bg-blue-50 text-blue-700",
    INSTRUCTOR: "bg-emerald-50 text-emerald-700",
    ADMIN: "bg-violet-50 text-violet-700",
  };

  const usersColumns: Column<User>[] = [
    {
      key: "fullName",
      label: "Full Name",
      render: (user) => (
        <p className="font-medium text-slate-800">{user.fullName}</p>
      ),
    },

    {
      key: "email",
      label: "Email",
      render: (user) => <p className="text-sm text-slate-600">{user.email}</p>,
    },

    {
      key: "role",
      label: "Role",
      render: (user) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            roleClasses[user.role]
          }`}
        >
          {roleLabels[user.role]}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Joined Date",
      render: (user) => (
        <p className="text-sm text-slate-600">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(user.createdAt))}
        </p>
      ),
    },
  ];

  return (
    <Table
      data={users}
      columns={usersColumns}
      filters={filters}
      search={{
        placeholder: "Search users...",
      }}
      meta={meta}
      getRowKey={(user) => user.id}
      emptyMessage="No users found."
    />
  );
};

export default UsersTable;
