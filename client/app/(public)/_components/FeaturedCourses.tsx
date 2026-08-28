/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Suspense } from "react";
import CoursesList from "./CoursesList";
import { courseServerService } from "@/services/courses/course.server.service";

const FeaturedCourses = async () => {
  let courses: any = [];
  let errorMessage = "";
  try {
    const data = await courseServerService.getCourses();
    courses = data.courses;
  } catch (error: any) {
    errorMessage = error?.message;
  }
  return (
    <section className="py-16">
      <div className="container">
        <header>
          <h3 className="page-title text-secondary">Featured Courses</h3>
          <p className="text-lg text-muted mb-8">
            Hand-picked premium content curated by our education experts to
            accelerate your learning journey.
          </p>
        </header>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Suspense fallback={<h3>Loading Courses...</h3>}>
          <CoursesList courses={courses.slice(0, 3)} />
        </Suspense>
        <Link className="link text-lg flex-center mt-8" href="/courses">
          View All
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCourses;
