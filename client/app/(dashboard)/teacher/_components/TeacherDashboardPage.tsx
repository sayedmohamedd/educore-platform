/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  BookOpen,
  CircleDollarSign,
  GraduationCap,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";

import StatsCard from "@/components/shared/cards/StatsCard";
import Table from "@/components/features/dashboard/table/Table";
import IconButton from "@/components/ui/IconButton";
import { Column } from "@/components/features/dashboard/table/types";
import { Enrollment } from "@/services/teachers/types";

interface Course {
  id: string;
  title: string;
  students: number;
  price: string;
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "REJECTED";
}

const TeacherDashboard = ({ statistics }: { statistics: any }) => {
  const stats = [
    {
      title: "Total Courses",
      number: statistics?.courses?.length || 0,
      percentage: 8.5,
      Icon: BookOpen,
    },
    {
      title: "Total Students",
      number: statistics?.students || 0,
      percentage: 14.2,
      Icon: Users,
    },
    {
      title: "Published Courses",
      number: statistics?.publishedCourses || 0,
      percentage: 6.4,
      Icon: GraduationCap,
    },
    {
      title: "Total Earnings",
      number: `${statistics?.totalRevenue} EGP` || 0,
      percentage: 18.7,
      Icon: CircleDollarSign,
    },
  ];

  const courseColumns: Column<Course>[] = [
    {
      header: "Course",
      accessorKey: "title",
    },
    {
      header: "Students",
      accessorKey: "students",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Status",
      cell: (course) => {
        const statusStyles = {
          PUBLISHED: "bg-green-100 text-green-700",
          DRAFT: "bg-slate-100 text-slate-700",
          REJECTED: "bg-yellow-100 text-yellow-700",
          APPROVED: "bg-blue-100 text-blue-700",
          SUBMITTED: "bg-amber-100 text-amber-700",
        };

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[course.status]
            }`}
          >
            {course.status}
          </span>
        );
      },
    },
  ];

  const enrollmentColumns: Column<Enrollment>[] = [
    {
      header: "Student",
      cell: (enrollment) => (
        <div>
          <p className="font-medium text-slate-700">
            {enrollment.user.fullName}
          </p>

          <p className="text-xs text-muted-foreground">
            {enrollment.user.email}
          </p>
        </div>
      ),
    },
    {
      header: "Course",
      cell: (enrollment) => enrollment.course.title,
    },
    {
      header: "Enrolled",
      accessorKey: "enrolledAt",
    },
  ];

  return (
    <main className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-700 sm:text-2xl">
            Teacher Dashboard
          </h2>

          <p className="paragraph">
            Manage your courses, students and earnings.
          </p>
        </div>

        <IconButton
          Icon={Plus}
          text="Create New Course"
          href="/teacher/courses/create"
          className="w-full bg-primary text-white hover:bg-secondary sm:w-auto"
        />
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Recent Courses */}
      <section className="mt-6">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-700">
              Recent Courses
            </h3>

            <p className="text-sm text-muted-foreground">
              Overview of your latest courses.
            </p>
          </div>

          <Link
            href="/teacher/courses"
            className="flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        <Table
          data={statistics.courses}
          columns={courseColumns}
          showFilter={false}
        />
      </section>

      {/* Recent Enrollments */}
      <section className="mt-8">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-700">
            Recent Enrollments
          </h3>

          <p className="text-sm text-muted-foreground">
            Students who recently enrolled in your courses.
          </p>
        </div>

        <Table
          data={statistics.enrollments}
          columns={enrollmentColumns}
          showFilter={false}
        />
      </section>
    </main>
  );
};

export default TeacherDashboard;
