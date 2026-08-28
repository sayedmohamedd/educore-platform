import { CurriculumCourse } from "./types";

interface CurriculumHeaderProps {
  course: CurriculumCourse;
  sectionsCount: number;
}

const CurriculumHeader = ({ course, sectionsCount }: CurriculumHeaderProps) => {
  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-sm text-muted-foreground">
            Course Curriculum
          </p>

          <h3 className="text-lg font-semibold text-slate-700">
            {course.title}
          </h3>

          {course.description && (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {course.description}
            </p>
          )}
        </div>

        <div className="shrink-0 text-start sm:text-end">
          <p className="text-sm text-muted-foreground">Sections</p>

          <p className="text-2xl font-semibold text-slate-700">
            {sectionsCount}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurriculumHeader;
