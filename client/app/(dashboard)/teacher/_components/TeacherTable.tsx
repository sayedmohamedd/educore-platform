"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "@/components/shared/Table/Table";
import { Column } from "@/components/shared/Table/types";
import { Enrollment } from "@/services/teachers/types";

const TeacherTable = ({ statistics }: { statistics: any }) => {
  const enrollmentColumns: Column<Enrollment>[] = [
    {
      key: "student",
      label: "Student",
      render: (enrollment) => (
        <div className="min-w-45">
          <p className="font-medium text-slate-700">
            {enrollment?.user?.fullName}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {enrollment?.user?.email}
          </p>
        </div>
      ),
    },
    {
      key: "course",
      label: "Course",
      render: (enrollment) => (
        <p className="min-w-45 font-medium text-slate-700">
          {enrollment.course.title}
        </p>
      ),
    },
    {
      key: "enrolledAt",
      label: "Enrolled",
      render: (enrollment) => (
        <span className="text-sm text-slate-600">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(new Date(enrollment.enrolledAt))}
        </span>
      ),
    },
  ];
  return (
    <Table
      data={statistics?.enrollments ?? []}
      columns={enrollmentColumns}
      getRowKey={(enrollment) => enrollment.id}
      emptyMessage="No enrollments found."
    />
  );
};

export default TeacherTable;
