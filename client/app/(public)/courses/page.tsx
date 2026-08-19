// Components
import AsideFilter from "@/app/(public)/courses/_components/AsideFilter";
import CourseCard from "@/components/shared/cards/CourseCard";
import CoursesTopics from "@/app/(public)/courses/_components/CoursesTopics";
import TablePagination from "@/components/features/dashboard/table/TablePagination";
import Select from "@/components/ui/Select";
// Data
import { courses } from "@/lib/data";
import { courseService } from "@/services/courses.service";

const Courses = async () => {
  const data = await courseService.getCourses();
  console.log(data);
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
          <Select>
            <option>الأحدث</option>
            <option>الأقدم</option>
            <option>الأعلى تقييماً</option>
          </Select>

          <div className="flex flex-col md:flex-row  gap-6 mt-6">
            {/* Filter */}
            <AsideFilter />
            {/* Courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center ">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
          {/* Pagination */}
          <TablePagination />
          {/* <Pagination /> */}
        </div>
      </div>
    </section>
  );
};

export default Courses;
