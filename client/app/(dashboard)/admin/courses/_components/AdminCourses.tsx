/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  DraftingCompass,
  Eye,
  XCircle,
} from "lucide-react";

import CoursePreview from "./CoursePreview";
import { AdminCourse, CourseStatus } from "./typs";
import StatsCard from "./StatsCard";

import Table from "@/components/shared/Table/Table";
import { Column, TableFilter } from "@/components/shared/Table/types";

type AdminCoursesProps = {
  courses: AdminCourse[];
};

type FilterStatus = "ALL" | "SUBMITTED" | "PUBLISHED" | "DRAFT" | "REJECTED";

const AdminCourses = ({ courses }: AdminCoursesProps) => {
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(
    null,
  );

  const stats = useMemo(
    () => ({
      total: courses.length,

      submitted: courses.filter((course) => course.status === "SUBMITTED")
        .length,

      published: courses.filter((course) => course.status === "PUBLISHED")
        .length,

      draft: courses.filter((course) => course.status === "DRAFT").length,

      rejected: courses.filter((course) => course.status === "REJECTED").length,
    }),
    [courses],
  );

  const filters: TableFilter<FilterStatus>[] = [
    {
      key: "status",
      label: "Status",
      options: [
        {
          value: "ALL",
          label: "All Courses",
        },
        {
          value: "SUBMITTED",
          label: "Pending",
        },
        {
          value: "PUBLISHED",
          label: "Published",
        },
        {
          value: "DRAFT",
          label: "Draft",
        },
        {
          value: "REJECTED",
          label: "Rejected",
        },
      ],
    },
  ];

  const columns: Column<AdminCourse>[] = [
    {
      key: "course",
      label: "Course",
      render: (course) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
            {course.thumbnail?.url ? (
              <img
                src={course.thumbnail.url}
                alt={course.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <BookOpen size={20} />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="max-w-65 truncate text-sm font-semibold text-slate-700">
              {course.title}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {course.sections.length} sections
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "teacher",
      label: "Teacher",
      render: (course) => (
        <div className="flex items-center gap-2">
          {course.teacher.user.avatar?.url ? (
            <img
              loading="lazy"
              src={course.teacher.user.avatar.url}
              alt={course.teacher.user.fullName}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-500">
              {course.teacher.user.fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-slate-700">
              {course.teacher.user.fullName}
            </p>

            <p className="text-xs text-slate-400">
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
        <div className="flex max-w-45 flex-wrap gap-1">
          {course.categories.slice(0, 2).map(({ category }) => (
            <span
              key={category.id}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
            >
              {category.name}
            </span>
          ))}

          {course.categories.length > 2 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
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
        <p className="text-sm font-medium text-slate-700">${course.price}</p>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (course) => {
        const statusClasses: Record<CourseStatus, string> = {
          SUBMITTED: "bg-amber-50 text-amber-700",
          PUBLISHED: "bg-emerald-50 text-emerald-700",
          APPROVED: "bg-blue-50 text-blue-700",
          DRAFT: "bg-slate-100 text-slate-700",
          REJECTED: "bg-red-50 text-red-700",
        };

        const statusLabels: Record<CourseStatus, string> = {
          SUBMITTED: "Pending",
          PUBLISHED: "Published",
          APPROVED: "Approved",
          DRAFT: "Draft",
          REJECTED: "Rejected",
        };

        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses[course.status]}`}
          >
            {statusLabels[course.status]}
          </span>
        );
      },
    },

    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (course) => (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setSelectedCourse(course)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-700">Courses</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and review all courses on the platform.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatsCard
            Icon={BookOpen}
            stats={stats.total}
            title="Total Courses"
            iconStyle="bg-blue-50 text-blue-600"
          />

          <StatsCard
            Icon={Clock3}
            stats={stats.submitted}
            title="Pending Review"
            iconStyle="bg-amber-50 text-amber-600"
          />

          <StatsCard
            Icon={CheckCircle2}
            stats={stats.published}
            title="Published"
            iconStyle="bg-emerald-50 text-emerald-600"
          />

          <StatsCard
            Icon={DraftingCompass}
            stats={stats.draft}
            title="Draft"
            iconStyle="bg-slate-100 text-slate-700"
          />

          <StatsCard
            Icon={XCircle}
            stats={stats.rejected}
            title="Rejected"
            iconStyle="bg-red-50 text-red-600"
          />
        </div>

        {/* Courses Table */}
        <Table
          data={courses}
          columns={columns}
          filters={filters}
          search={{
            placeholder: "Search courses...",
          }}
          filterData={(course, { search, status }) => {
            const matchesStatus = status === "ALL" || course.status === status;

            const matchesSearch =
              !search ||
              course.title.toLowerCase().includes(search) ||
              course.teacher.user.fullName.toLowerCase().includes(search) ||
              course.teacher.user.email.toLowerCase().includes(search) ||
              course.categories.some(({ category }) =>
                category.name.toLowerCase().includes(search),
              );

            return matchesStatus && matchesSearch;
          }}
          getRowKey={(course) => course.id}
          emptyMessage="No courses found."
        />
      </div>

      {selectedCourse && (
        <CoursePreview
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
};

export default AdminCourses;
