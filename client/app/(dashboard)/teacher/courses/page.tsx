import IconButton from "@/components/shared/IconButton";
import { Plus } from "lucide-react";
import { courses, coursesTabs } from "@/lib/data";
import CourseCard from "@/components/shared/cards/CourseCard";
import Link from "next/link";
import Tabs from "./[slug]/_components/Tabs";

const TeacherCourses = () => {
  return (
    <main className="container mx-auto px-8 py-4">
      <Tabs tabs={coursesTabs} />
      <header className="flex-between my-6">
        <div>
          <h3 className="text-muted text-lg font-medium mb-2 text-start">
            My Courses
          </h3>
          <p className="text-muted-foreground text-sm">
            Manage and monitor your ongoing educational programs.
          </p>
        </div>
        <IconButton
          Icon={Plus}
          text="Create New Course"
          className="bg-primary text-white hover:bg-secondary"
          href="/teacher/courses/create"
        />
      </header>
      <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            image={course.image}
            title={course.title}
            description={course.description}
            students={course.students}
            status={course.status}
            actions={
              <Link
                href="/teacher/courses/1"
                className="block w-full rounded-xl bg-primary py-2.5 text-center font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Edit Course
              </Link>
            }
          />
        ))}
      </section>
    </main>
  );
};

export default TeacherCourses;
