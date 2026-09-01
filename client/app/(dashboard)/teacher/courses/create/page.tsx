/* eslint-disable @typescript-eslint/no-explicit-any */
import { categoryServerService } from "@/services/categories/category.server.service";
import { Category } from "@/services/categories/types";
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import CreateCourseForm from "../_components/CreateCourseForm";

const CreateCourse = async () => {
  let errorMessage: string = "";
  let categories: Category[] = [];
  try {
    const data = await categoryServerService.getAll();
    categories = data.categories;
  } catch (error: any) {
    errorMessage = error?.message;
  }

  return (
    <main className="px-8 py-4">
      {/* Header */}
      <header className="flex-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">
            Create New Course
          </h2>

          <p className="paragraph">
            Create and configure a new course for your students.
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
        <CreateCourseForm categories={categories} />
      </Suspense>
    </main>
  );
};

export default CreateCourse;
