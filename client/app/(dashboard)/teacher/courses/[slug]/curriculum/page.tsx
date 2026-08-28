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
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";

// import CurriculumHeader from "./_components/CurriculumHeader";

// import { courseClientService } from "@/services/courses/courses.service";
// import {
//   CurriculumSection,
//   CreateSectionInput,
//   CurriculumCourse,
// } from "./_components/types";
// import AddSectionForm from "./_components/AddSectionForm";
// import SectionList from "./_components/SectionList";

// const CurriculumBuilder = ({ course }: { course: CurriculumCourse }) => {
//   const [sections, setSections] = useState<CurriculumSection[]>(
//     course.sections ?? [],
//   );

//   const [showSectionForm, setShowSectionForm] = useState(false);

//   const [isCreatingSection, setIsCreatingSection] = useState(false);

//   const [errorMessage, setErrorMessage] = useState("");

//   const handleAddSection = async (data: CreateSectionInput) => {
//     try {
//       setErrorMessage("");
//       setIsCreatingSection(true);

//       const response = await courseClientService.addSection(course.id, data);

//       const newSection = response?.section ?? response?.data ?? response;

//       setSections((prev) => [...prev, newSection]);

//       setShowSectionForm(false);
//     } catch (error: any) {
//       setErrorMessage(
//         error?.message || "Failed to create section. Please try again.",
//       );
//     } finally {
//       setIsCreatingSection(false);
//     }
//   };

//   const handleLessonCreated = (
//     sectionId: string,
//     lesson: CurriculumSection["lessons"][number],
//   ) => {
//     setSections((prev) =>
//       prev.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               lessons: [...section.lessons, lesson],
//             }
//           : section,
//       ),
//     );
//   };

//   return (
//     <div className="mt-8 max-w-5xl">
//       <CurriculumHeader course={course} sectionsCount={sections.length} />

//       <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
//         {/* Header */}
//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-slate-700">
//               Course Content
//             </h3>

//             <p className="mt-1 text-sm leading-6 text-muted-foreground">
//               Create sections and add lessons to build your curriculum.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() => setShowSectionForm(true)}
//             disabled={showSectionForm}
//             className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
//           >
//             + Add Section
//           </button>
//         </div>

//         {/* Error */}
//         {errorMessage && (
//           <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             {errorMessage}
//           </div>
//         )}

//         {/* Add Section */}
//         {showSectionForm && (
//           <AddSectionForm
//             nextOrder={sections.length}
//             isLoading={isCreatingSection}
//             onSubmit={handleAddSection}
//             onCancel={() => setShowSectionForm(false)}
//           />
//         )}

//         {/* Sections */}
//         <SectionList
//           sections={sections}
//           onLessonCreated={handleLessonCreated}
//         />

//         {/* Empty State */}
//         {sections.length === 0 && !showSectionForm && (
//           <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
//             <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
//               <span className="text-xl text-primary">+</span>
//             </div>

//             <h4 className="font-semibold text-slate-700">No sections yet</h4>

//             <p className="mt-1 px-4 text-sm text-muted-foreground">
//               Start building your curriculum by adding the first section.
//             </p>
//           </div>
//         )}
//       </section>

//       {/* Actions */}
//       <div className="flex flex-col-reverse gap-3 py-6 sm:flex-row sm:justify-end">
//         <button
//           type="button"
//           className="w-full rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
//         >
//           Save as Draft
//         </button>

//         <button
//           type="button"
//           className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary sm:w-auto"
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CurriculumBuilder;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { courseServerService } from "@/services/courses/course.server.service";
// import CurriculumBuilder from "../_components/CurriculumBuilder";
// import { Suspense } from "react";

// const CurriculumPage = async ({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) => {
//   const { slug } = await params;

//   if (!slug) return null;
//   let course: any = {};
//   let errorMessage = "";
//   try {
//     course = await courseServerService.getCourse(slug);
//   } catch (error: any) {
//     errorMessage = error?.message;
//   }

//   return (
//     <main className="px-8 py-4">
//       {/* Header */}
//       <header className="flex-between">
//         <div>
//           <h2 className="text-2xl font-bold text-slate-700">
//             Course Curriculum
//           </h2>

//           <p className="paragraph">
//             Organize your course into sections and lessons.
//           </p>
//         </div>
//       </header>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <Suspense fallback={<div>Loading...</div>}>
//         <CurriculumBuilder course={course} />
//       </Suspense>
//     </main>
//   );
// };

// export default CurriculumPage;
