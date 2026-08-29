"use client";

import Table from "@/components/features/dashboard/table/Table";
import { Column } from "@/components/features/dashboard/table/types";

interface Student {
  id: string;
  fullName: string;
  email: string;
  enrolledAt: string;
  coursesCount: number;
}

interface StudentsTableProps {
  students: Student[];
}

const StudentsTable = ({ students }: StudentsTableProps) => {
  const studentColumns: Column<Student>[] = [
    {
      header: "Student",
      accessorKey: "fullName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Courses",
      accessorKey: "coursesCount",
    },
    {
      header: "Enrolled At",
      accessorKey: "enrolledAt",
    },
    {
      header: "Actions",
      cell: (student) => (
        <button
          type="button"
          onClick={() => console.log(student.id)}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Profile
        </button>
      ),
      className: "text-right",
    },
  ];

  return <Table data={students} columns={studentColumns} showFilter={false} />;
};

export default StudentsTable;
