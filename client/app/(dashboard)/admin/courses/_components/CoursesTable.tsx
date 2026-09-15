/* eslint-disable @next/next/no-img-element */
"use client";
import Table from "@/components/shared/Table/Table";
import { AdminCourse, CourseStatus } from "./types";
import { Meta } from "@/services/helpers";
import CoursePreview from "./CoursePreview";
import { Column, TableFilter } from "@/components/shared/Table/types";
import { useState } from "react";

type FilterStatus = "" | CourseStatus;

const CoursesTable = ({
  courses,
  meta,
  isLoading = false,
}: {
  courses: AdminCourse[];
  meta: Meta;
  isLoading?: boolean;
}) => {
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(
    null,
  );

  const filters: TableFilter<FilterStatus>[] = [
    {
      key: "status",
      label: "Status",
      options: [
        {
          value: "",
          label: "All Courses",
        },
        {
          value: CourseStatus.SUBMITTED,
          label: "Pending",
        },
        {
          value: CourseStatus.PUBLISHED,
          label: "Published",
        },
        {
          value: CourseStatus.DRAFT,
          label: "Draft",
        },
        {
          value: CourseStatus.REJECTED,
          label: "Rejected",
        },
      ],
    },
  ];

  const statusLabels: Record<CourseStatus, string> = {
    [CourseStatus.APPROVED]: "Approved",
    [CourseStatus.SUBMITTED]: "Pending",
    [CourseStatus.PUBLISHED]: "Published",
    [CourseStatus.DRAFT]: "Draft",
    [CourseStatus.REJECTED]: "Rejected",
  };

  const statusClasses: Record<CourseStatus, string> = {
    [CourseStatus.APPROVED]: "bg-emerald-50 text-emerald-700",
    [CourseStatus.SUBMITTED]: "bg-amber-50 text-amber-700",
    [CourseStatus.PUBLISHED]: "bg-emerald-50 text-emerald-700",
    [CourseStatus.DRAFT]: "bg-slate-100 text-slate-700",
    [CourseStatus.REJECTED]: "bg-red-50 text-red-700",
  };

  const columns: Column<AdminCourse>[] = [
    {
      key: "course",
      label: "Course",
      render: (course) => (
        <div className="flex min-w-55 items-center gap-3">
          <img
            src={course.thumbnail?.url}
            alt={course.title}
            className="size-12 rounded-lg object-cover"
          />

          <div className="min-w-0">
            <p className="truncate font-medium text-slate-800">
              {course.title}
            </p>

            <p className="text-xs text-muted-foreground">
              {course.sections?.length} sections
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "teacher",
      label: "Teacher",
      render: (course) => (
        <div className="flex min-w-45 items-center gap-3">
          <img
            loading="lazy"
            src={course.teacher.user.avatar?.url}
            alt={course.teacher.user.fullName}
            className="size-9 rounded-full object-cover"
          />

          <div className="min-w-0">
            <p className="truncate font-medium text-slate-800">
              {course.teacher.user.fullName}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {course.teacher.user.email}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
      render: (course) => (
        <div className="flex max-w-55 flex-wrap gap-1.5">
          {course.categories.slice(0, 2).map((category) => (
            <span
              key={category.id}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              {category.name}
            </span>
          ))}

          {course.categories.length > 2 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
              +{course.categories.length - 2}
            </span>
          )}
        </div>
      ),
    },

    {
      key: "price",
      label: "Price",
      render: (course) => (
        <span className="font-medium text-slate-800">
          {Number(course.price)}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (course) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            statusClasses[course.status]
          }`}
        >
          {statusLabels[course.status]}
        </span>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (course) => (
        <button
          type="button"
          onClick={() => setSelectedCourse(course)}
          className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
        >
          Preview
        </button>
      ),
    },
  ];
  return (
    <>
      <Table
        data={courses}
        columns={columns}
        filters={filters}
        search={{
          placeholder: "Search courses...",
        }}
        meta={meta}
        isLoading={isLoading}
        getRowKey={(course) => course.id}
        emptyMessage="No courses found."
      />
      {selectedCourse && (
        <CoursePreview
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
};

export default CoursesTable;
