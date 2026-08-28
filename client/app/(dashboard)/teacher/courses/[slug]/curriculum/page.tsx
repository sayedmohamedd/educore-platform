/* eslint-disable @typescript-eslint/no-explicit-any */
import CurriculumBuilder from "../_components/CurriculumBuilder";
import { courseServerService } from "@/services/courses/course.server.service";

const CurriculumPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  let errorMessage = "";
  let course: any = {};
  try {
    course = await courseServerService.getCourse(slug);
  } catch (error: any) {
    errorMessage = error?.message;
  }

  return (
    <main className="px-8 py-4">
      <header className="flex-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-700">
            Course Curriculum
          </h2>

          <p className="paragraph">
            Organize your course into sections and lessons.
          </p>
        </div>
      </header>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <CurriculumBuilder course={course} />
    </main>
  );
};

export default CurriculumPage;
