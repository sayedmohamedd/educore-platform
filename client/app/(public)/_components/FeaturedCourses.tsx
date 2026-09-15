import Link from "next/link";
import { Suspense } from "react";
import CoursesList from "./CoursesList";
import { courseServerService } from "@/services/courses/course.server.service";
import { Course } from "@/services/courses/types";
import { Role } from "@/store/auth.store";
import CoursesListSkeleton from "@/components/shared/cards/CoursesListSkeleton";

export const dynamic = "force-dynamic";

const FeaturedCourses = async () => {
  let courses: Course[] = [];

  try {
    const data = await courseServerService.getCourses();
    courses = data.courses;
  } catch (error: unknown) {
    console.error(error);
  }

  return (
    <section className="py-16">
      <div className="container">
        <header>
          <h3 className="page-title text-secondary">كورسات مميزة</h3>

          <p className="mb-8 text-lg text-muted">
            اخترنا لك مجموعة من أفضل الكورسات لمساعدتك على تطوير مهاراتك وتحقيق
            أهدافك التعليمية والمهنية.
          </p>
        </header>

        <Suspense fallback={<CoursesListSkeleton />}>
          <CoursesList courses={courses.slice(0, 3)} role={Role.STUDENT} />
        </Suspense>

        <Link className="mt-8 flex-center text-lg link" href="/courses">
          عرض كل الكورسات
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCourses;
