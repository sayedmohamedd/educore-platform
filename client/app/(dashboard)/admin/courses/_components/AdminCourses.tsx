/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import Table from "@/components/shared/Table/Table";
import { Column, TableFilter } from "@/components/shared/Table/types";

import CoursePreview from "./CoursePreview";
import { AdminCourse, CourseStatus } from "./types";
import { Meta } from "@/services/helpers";

type Props = {
  courses: AdminCourse[];
  meta?: Meta;
  isLoading?: boolean;
};

type FilterStatus = "" | CourseStatus;

const AdminCourses = ({ courses, isLoading, meta }: Props) => {
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(
    null,
  );

  const stats = useMemo(() => {
    return {
      total: courses.length,
      submitted: courses.filter(
        (course) => course.status === CourseStatus.SUBMITTED,
      ).length,
      published: courses.filter(
        (course) => course.status === CourseStatus.PUBLISHED,
      ).length,
      draft: courses.filter((course) => course.status === CourseStatus.DRAFT)
        .length,
      rejected: courses.filter(
        (course) => course.status === CourseStatus.REJECTED,
      ).length,
    };
  }, [courses]);

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
    <section className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Courses</h1>
        <p className="text-sm text-muted-foreground">
          Manage and review courses submitted by teachers.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Courses</p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            {stats.total}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Pending</p>

          <p className="mt-2 text-2xl font-bold text-amber-600">
            {stats.submitted}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Published</p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {stats.published}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Draft</p>

          <p className="mt-2 text-2xl font-bold text-slate-700">
            {stats.draft}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Rejected</p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            {stats.rejected}
          </p>
        </div>
      </div>

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
    </section>
  );
};

export default AdminCourses;
