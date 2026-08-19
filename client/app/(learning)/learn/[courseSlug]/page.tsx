// Components
import CourseContent from "../_components/CourseContent";
import Tabs from "@/components/ui/Tabs";
import Controls from "../_components/Controls";
import VideoPlayer from "../_components/VideoPlayer";
import Outcomes from "../_components/Outcomes";

const CourseLearningPage = () => {
  return (
    <main>
      <div className="container flex gap-4">
        <CourseContent />
        <div className="flex-1">
          {/* Video Player */}
          <VideoPlayer />

          {/* Controls */}
          <Controls />

          <section className="bg-white shadow-md rounded-lg p-4 mt-4">
            {/* Tabs */}
            <Tabs tabs={["Overview", "Resources", "Assessments"]} />

            {/* Content */}
            <div className="p-4 flex gap-4">
              <div className="text-start p-4 w-fit">
                <h4 className="section-title">About This Lesson</h4>
                <p className="text-muted leading-8">
                  In this intensive session, we dive deep into the complexities
                  of distributed system architecture. We&apos;ll explore how
                  modern cloud ecosystems manage data consistency at scale, the
                  trade-offs of microservices, and how to design for 99.99%
                  availability using Lumina&apos;s proprietary frameworks.
                </p>
              </div>
              {/* Outcomes */}
              <Outcomes />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CourseLearningPage;
