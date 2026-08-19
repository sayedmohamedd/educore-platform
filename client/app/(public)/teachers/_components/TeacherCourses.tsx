import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CourseCard from "../../../../components/shared/cards/CourseCard";
import { courses } from "@/lib/data";

const TeacherCourses = () => {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold">الدورات المقدمة</h2>

          <p className="mt-2 text-muted-foreground">
            تعلم مع أحدث الدورات العملية التي يقدمها المدرب.
          </p>
        </div>

        <Link
          href="#"
          className="flex items-center gap-2 font-medium text-primary transition hover:gap-3"
        >
          عرض جميع الدورات
          <ArrowLeft size={18} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
};

export default TeacherCourses;
