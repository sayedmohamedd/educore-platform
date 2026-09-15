"use client";
import Table from "@/components/shared/Table/Table";
import { Column, TableFilter } from "@/components/shared/Table/types";
import { Meta } from "@/services/helpers";

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledAt: string;
  coursesCount: number;
}

const StudentsTable = ({
  students,
  meta,
}: {
  students: Student[];
  meta: Meta;
}) => {
  const filters: TableFilter[] = [
    {
      key: "courses",
      label: "Courses",
      options: [
        {
          value: "ALL",
          label: "All Students",
        },
      ],
    },
  ];

  const columns: Column<Student>[] = [
    {
      key: "student",
      label: "Student",
      render: (student) => (
        <p className="font-medium text-slate-800">{student.fullName}</p>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (student) => (
        <p className="text-sm text-slate-600">{student.email}</p>
      ),
    },
    {
      key: "courses",
      label: "Courses",
      render: (student) => (
        <span className="text-sm font-medium text-slate-700">
          {student?.coursesCount}
        </span>
      ),
    },
    {
      key: "enrolledAt",
      label: "Enrolled At",
      render: (student) => (
        <span className="text-sm text-slate-600">
          {student?.enrolledAt}
          {/* {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(student.enrolledAt))} */}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: () => (
        <button
          type="button"
          className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View Profile
        </button>
      ),
    },
  ];
  return (
    <Table
      data={students}
      columns={columns}
      filters={filters}
      meta={meta}
      search={{
        placeholder: "Search students...",
      }}
      getRowKey={(student) => student.id}
      emptyMessage="No students found."
    />
  );
};

export default StudentsTable;
