"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@/components/shared/Table/Table";
import { Column } from "@/components/shared/Table/types";

interface Course {
  id: string;
  title: string;
  students: number;
  price: string;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "REJECTED";
}

const StatisticsTable = ({ statistics }: { statistics: any }) => {
  const courseColumns: Column<Course>[] = [
    {
      key: "course",
      label: "Course",
      render: (course) => (
        <p className="min-w-45 font-medium text-slate-800">{course.title}</p>
      ),
    },
    {
      key: "students",
      label: "Students",
      render: (course) => (
        <span className="font-medium text-slate-700">{course.students}</span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (course) => (
        <span className="font-medium text-slate-700">{course.price} EGP</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (course) => {
        const statusStyles: Record<Course["status"], string> = {
          PUBLISHED: "bg-green-100 text-green-700",
          DRAFT: "bg-slate-100 text-slate-700",
          REJECTED: "bg-red-100 text-red-700",
          APPROVED: "bg-blue-100 text-blue-700",
          SUBMITTED: "bg-amber-100 text-amber-700",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[course.status]
            }`}
          >
            {course.status}
          </span>
        );
      },
    },
  ];
  return (
    <Table
      data={statistics?.courses ?? []}
      columns={courseColumns}
      getRowKey={(course) => course.id}
      emptyMessage="No courses found."
    />
  );
};

export default StatisticsTable;
