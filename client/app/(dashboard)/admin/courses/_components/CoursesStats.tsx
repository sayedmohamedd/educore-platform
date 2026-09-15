"use client";
import { useMemo } from "react";
import { AdminCourse, CourseStatus } from "./types";

const CoursesStats = ({ courses }: { courses: AdminCourse[] }) => {
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

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Total Courses</p>

        <p className="mt-2 text-2xl font-bold text-slate-800">{stats?.total}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Pending</p>

        <p className="mt-2 text-2xl font-bold text-amber-600">
          {stats?.submitted}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Published</p>

        <p className="mt-2 text-2xl font-bold text-emerald-600">
          {stats?.published}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Draft</p>

        <p className="mt-2 text-2xl font-bold text-slate-700">{stats?.draft}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Rejected</p>

        <p className="mt-2 text-2xl font-bold text-red-600">
          {stats?.rejected}
        </p>
      </div>
    </div>
  );
};

export default CoursesStats;
