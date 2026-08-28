/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UpdateCourseForm from "../../_components/UpdateCourseForm";
import { courseServerService } from "@/services/courses/course.server.service";

const EditCoursePage = async ({ params }: { params: Promise<any> }) => {
  const { slug } = await params;
  console.log(slug);
  let errorMessage = "";
  let course: any = {};
  try {
    course = await courseServerService.getCourse(slug);
  } catch (error: any) {
    errorMessage = error?.message;
  }
  return (
    <main className="px-8 py-4">
      {/* Header */}
      <header className="flex-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Edit Course</h2>

          <p className="paragraph">
            Configure your course content and settings.
          </p>
        </div>

        <Link
          href="/teacher/courses"
          className="flex-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <X size={18} />
          Cancel
        </Link>
      </header>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Suspense fallback={<h3>Loading...</h3>}>
        <UpdateCourseForm course={course} />
      </Suspense>
    </main>
  );
};

export default EditCoursePage;
