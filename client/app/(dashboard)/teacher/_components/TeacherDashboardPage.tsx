/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import TeacherStats from "./TeacherStats";
import { Suspense } from "react";
import StatsSkeleton from "../../admin/_components/StatsSkeleton";
import TeacherTable from "./TeacherTable";
import StatisticsTable from "./StatisticsTable";

const TeacherDashboard = ({ statistics }: { statistics: any }) => {
  return (
    <main className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl text-right font-bold text-slate-700 sm:text-2xl">
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

      <Suspense fallback={<StatsSkeleton />}>
        <TeacherStats statistics={statistics} />
      </Suspense>

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
        <Suspense>
          <StatisticsTable statistics={statistics} />
        </Suspense>
      </section>

      <section className="mt-8">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-slate-700">
            Recent Enrollments
          </h3>

          <p className="text-sm text-muted-foreground">
            Students who recently enrolled in your courses.
          </p>
        </div>

        <TeacherTable statistics={statistics} />
      </section>
    </main>
  );
};

export default TeacherDashboard;
