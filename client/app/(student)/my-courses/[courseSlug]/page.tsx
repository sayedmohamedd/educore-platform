import CourseContent from "../_components/CourseContent";
import Controls from "../_components/Controls";
import Outcomes from "../_components/Outcomes";
import VideoPlayer from "../_components/VideoPlayer";
import Tabs from "@/components/ui/Tabs";

const CourseLearningPage = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 py-4 sm:py-6">
      <div className="container flex flex-col gap-4 lg:flex-row lg:items-start">
        <CourseContent />

        <div className="min-w-0 flex-1">
          {/* Video */}
          <VideoPlayer />

          {/* Lesson Controls */}
          <Controls />

          {/* Lesson Information */}
          <section className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Tabs tabs={["Overview", "Resources", "Assessments"]} />

            <div className="p-4 sm:p-6">
              <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-xl font-semibold text-slate-700">
                    About This Lesson
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    In this intensive session, we dive deep into the
                    complexities of distributed system architecture. We&apos;ll
                    explore how modern cloud ecosystems manage data consistency
                    at scale, the trade-offs of microservices, and how to design
                    highly available systems.
                  </p>
                </div>

                <Outcomes />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CourseLearningPage;
// // Components
// import CourseContent from "../_components/CourseContent";
// import Tabs from "@/components/ui/Tabs";
// import Controls from "../_components/Controls";
// import VideoPlayer from "../_components/VideoPlayer";
// import Outcomes from "../_components/Outcomes";

// const CourseLearningPage = () => {
//   return (
//     <main>
//       <div className="container flex gap-4">
//         <CourseContent />
//         <div className="flex-1">
//           {/* Video Player */}
//           <VideoPlayer />

//           {/* Controls */}
//           <Controls />

//           <section className="bg-white shadow-md rounded-lg p-4 mt-4">
//             {/* Tabs */}
//             <Tabs tabs={["Overview", "Resources", "Assessments"]} />

//             {/* Content */}
//             <div className="p-4 flex gap-4">
//               <div className="text-start p-4 w-fit">
//                 <h4 className="section-title">About This Lesson</h4>
//                 <p className="text-muted leading-8">
//                   In this intensive session, we dive deep into the complexities
//                   of distributed system architecture. We&apos;ll explore how
//                   modern cloud ecosystems manage data consistency at scale, the
//                   trade-offs of microservices, and how to design for 99.99%
//                   availability using Lumina&apos;s proprietary frameworks.
//                 </p>
//               </div>
//               {/* Outcomes */}
//               <Outcomes />
//             </div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default CourseLearningPage;
