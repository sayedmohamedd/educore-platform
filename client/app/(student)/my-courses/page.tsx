import { BookOpen, Clock3, GraduationCap, PlayCircle } from "lucide-react";
import { Suspense } from "react";
import MyCoursesList from "./_components/MyCoursesList";
import StudentStatCard from "./_components/StudentStatCard";
import { studentServerService } from "@/services/students/student.server.service";
import { Enrollment } from "@/services/courses/types";
import CoursesListSkeleton from "@/components/shared/cards/CoursesListSkeleton";

const MyCourses = async () => {
  let enrollments: Enrollment[] = [];
  try {
    const data = await studentServerService.getMyCourses({
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    enrollments = data.enrollments;
  } catch (error) {
    console.error(error);
  }

  const totalCourses = enrollments.length;

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-700">كورساتي</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          كمل تعلمك وتابع تقدمك في الكورسات.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StudentStatCard
          Icon={BookOpen}
          title="الكورسات المشترك فيها"
          value={totalCourses}
        />

        <StudentStatCard Icon={PlayCircle} title="قيد التعلم" />

        <StudentStatCard Icon={GraduationCap} title="الكورسات المكتملة" />

        <StudentStatCard Icon={Clock3} title="إجمالي الدروس" />
      </section>

      {/* Courses */}
      <section className="mt-8">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-700">
            الكورسات بتاعتك
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            كمل من حيث ما وقفت وتابع تقدمك في كل كورس.
          </p>
        </div>

        {/* Courses list */}
        <Suspense fallback={<CoursesListSkeleton />}>
          <MyCoursesList enrollments={enrollments} />
        </Suspense>
      </section>
    </main>
  );
};

export default MyCourses;
