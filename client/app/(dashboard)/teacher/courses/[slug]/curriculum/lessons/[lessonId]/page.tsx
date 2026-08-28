/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { courseServerService } from "@/services/courses/course.server.service";
import LessonEditor from "./_components/LessonEditor";
import { Suspense } from "react";

const LessonPage = async ({
  params,
}: {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
}) => {
  const { slug, lessonId } = await params;
  let lesson: any = {};
  let errorMessage = "";
  if (!slug || !lessonId) return null;

  try {
    lesson = await courseServerService.getLessonById(lessonId);
  } catch (error: any) {
    errorMessage = error?.message;
  }

  return (
    <main className="px-8 py-4">
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">Edit Lesson</h2>

          <p className="paragraph">
            Configure your lesson content and settings.
          </p>
        </div>

        <Link
          href={`/teacher/courses/${slug}/curriculum`}
          className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
          Back to Curriculum
        </Link>
      </header>

      {errorMessage && <p className="paragraph text-red-500">{errorMessage}</p>}
      <Suspense fallback={<div>Loading...</div>}>
        <LessonEditor lesson={lesson} courseId={lesson.courseId} />
      </Suspense>
    </main>
  );
};

export default LessonPage;
