/* eslint-disable @typescript-eslint/no-explicit-any */
import AsideFilter from "@/app/(public)/courses/_components/AsideFilter";
import CoursesTopics from "@/app/(public)/courses/_components/CoursesTopics";
import TablePagination from "@/components/shared/Table/TablePagination";
import Select from "@/components/ui/Select";
import { Suspense } from "react";
import { courseServerService } from "@/services/courses/course.server.service";
import CoursesList from "../_components/CoursesList";
import SearchInput from "@/components/layout/Navbar/SearchInput";
import { Role } from "@/store/auth.store";
import CoursesListSkeleton from "@/components/shared/cards/CoursesListSkeleton";
import { Meta } from "@/services/helpers";

const Courses = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const params = await searchParams;

  let courses: any = [];
  let meta: Meta = {} as Meta;

  try {
    const data = await courseServerService.getCourses(params);
    courses = data.courses;
    meta = data.meta;
  } catch (error: unknown) {
    console.error(error);
  }

  return (
    <section className="pb-4 sm:py-12">
      <div className="container">
        <h1 className="page-title mb-4 text-muted-foreground">
          اكتشف الكورسات
        </h1>

        <div>
          {/* Topics */}
          <Suspense fallback={<h3>Loading...</h3>}>
            <CoursesTopics />
          </Suspense>

          {/* Sort */}
          <div className="mt-4 sm:mt-6">
            <Suspense fallback={<div>Loading...</div>}>
              <Select sortBy="createdAt" defaultOrder="desc">
                <option value="createdAt_desc">الأحدث</option>
                <option value="createdAt_asc">الأقدم</option>
                <option value="rating_desc">الأعلى تقييماً</option>
              </Select>
            </Suspense>
          </div>

          <div className="mt-6 flex flex-col gap-6 md:flex-row">
            {/* Filter */}
            <Suspense fallback={<div>Loading...</div>}>
              <AsideFilter meta={meta} />
            </Suspense>

            {/* Courses */}
            <div className="min-w-0 flex-1 flex flex-col gap-8">
              <Suspense fallback={<div>Loading...</div>}>
                <SearchInput
                  endpoint="courses"
                  className="w-full md:max-w-3/5"
                />
              </Suspense>

              <Suspense fallback={<CoursesListSkeleton />}>
                <CoursesList role={Role.STUDENT} courses={courses} />
              </Suspense>
            </div>
          </div>

          {/* Pagination */}
          {meta && <TablePagination meta={meta} />}
        </div>
      </div>
    </section>
  );
};

export default Courses;
