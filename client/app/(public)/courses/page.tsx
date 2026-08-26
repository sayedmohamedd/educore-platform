/* eslint-disable @typescript-eslint/no-explicit-any */
// Components
import AsideFilter from "@/app/(public)/courses/_components/AsideFilter";
import CoursesTopics from "@/app/(public)/courses/_components/CoursesTopics";
import TablePagination from "@/components/features/dashboard/table/TablePagination";
import Select from "@/components/ui/Select";
// Data
import { Suspense } from "react";
import CoursesList from "./_components/CoursesList";
import { courseService } from "@/services/courses.service";

const Courses = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const params = await searchParams;
  let courses: any = [];
  let meta: any = {};
  let errorMessage = "";
  try {
    const data = await courseService.getCourses(params);
    courses = data.courses;
    meta = data.meta;
  } catch (error: any) {
    errorMessage = error?.message;
  }

  return (
    <section className="py-12">
      <div className="container">
        <h1 className="page-title my-4 text-muted-foreground">
          اكتشف الكورسات
        </h1>
        <div>
          {/* Topics */}
          <CoursesTopics />

          {/* Sort */}
          <Select sortBy="createdAt" defaultOrder="desc">
            <option value="createdAt_desc">الأحدث</option>
            <option value="createdAt_asc">الأقدم</option>
            <option value="rating_desc">الأعلى تقييماً</option>
          </Select>

          <div className="flex flex-col md:flex-row  gap-6 mt-6">
            {/* Filter */}
            <AsideFilter meta={meta} />
            {/* Error */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {/* Courses */}
            <Suspense fallback={<div>Loading...</div>}>
              <CoursesList courses={courses} />
            </Suspense>
          </div>
          {/* Pagination */}
          <TablePagination meta={meta} />
        </div>
      </div>
    </section>
  );
};

export default Courses;
