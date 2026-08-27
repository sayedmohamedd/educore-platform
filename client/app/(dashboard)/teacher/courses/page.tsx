/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import { coursesTabs } from "@/lib/data";
import Tabs from "./[slug]/_components/Tabs";
import IconButton from "@/components/ui/IconButton";
import { Suspense } from "react";
import CoursesList from "@/app/(public)/_components/CoursesList";
import { teachersService } from "@/services/teachers.service";
import { Role } from "@/store/auth.store";

const TeacherCourses = async () => {
  let errorMessage = "";
  let courses: any = [];
  try {
    const data = await teachersService.getTeacherCourses();
    console.log(data);
    courses = data.courses;
  } catch (error: any) {
    errorMessage = error?.message;
  }
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
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Suspense fallback={<h3>Loading...</h3>}>
        <CoursesList role={Role.TEACHER} courses={courses} />
      </Suspense>
    </main>
  );
};

export default TeacherCourses;
