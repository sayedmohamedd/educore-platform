import CurriculumBuilder from "../_components/CurriculumBuilder";

const CurriculumPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;

  return (
    <main className="px-8 py-4">
      {/* Header */}
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

      <CurriculumBuilder courseId={courseId} />
    </main>
  );
};

export default CurriculumPage;
