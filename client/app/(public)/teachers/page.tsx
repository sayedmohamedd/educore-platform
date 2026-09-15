import TablePagination from "@/components/features/dashboard/table/TablePagination";
import TeachersList from "./_components/TeachersList";
import { Suspense } from "react";
import { teachersService } from "@/services/teachers/teacher.server.service";
import { Meta } from "@/services/helpers";
import { Teacher } from "@/services/teachers/types";
import TeachersListSkeleton from "./_components/TeacherListSkeleton";

const Teachers = async () => {
  let teachers: Teacher[] = [];
  let meta: Meta = {} as Meta;
  try {
    const data = await teachersService.getTeachers();
    teachers = data.teachers;
    meta = data.meta;
  } catch (error: unknown) {
    console.error(error);
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container">
        {/* Header */}
        <header className="mb-8">
          <h1 className="page-title text-muted-foreground">مدرسينا</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            تعرف على نخبة من المدرسين والخبراء وابدأ رحلة التعلم معهم.
          </p>
        </header>

        {/* Teachers */}
        <Suspense fallback={<TeachersListSkeleton />}>
          <TeachersList teachers={teachers} />
        </Suspense>

        {/* Pagination */}
        <Suspense fallback={<div />}>
          <TablePagination meta={meta} />
        </Suspense>
      </div>
    </section>
  );
};

export default Teachers;
