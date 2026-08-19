// Libraries
import { ArrowRight } from "lucide-react";
import Link from "next/link";
// Components
import Thumbnail from "./_components/Thumbnail";
import Tabs from "./_components/Tabs";
import CourseDetailsForm from "./_components/CourseDetailsForm";
import Categorization from "./_components/Categorization";
import { tabs } from "@/lib/data";

const EditCourse = () => {
  return (
    <main>
      <div className="container mx-auto px-8 py-4">
        {/* Back to Courses */}
        <nav className="flex gap-0.5 ">
          <ArrowRight className="text-primary" />
          <Link className="link" href="/teacher/courses">
            Back to Courses
          </Link>
        </nav>

        {/* Course Tabs */}
        <Tabs tabs={tabs} />

        <div className="grid grid-cols-12 gap-4">
          {/* Course Details */}
          <CourseDetailsForm />
          {/* Course Thumbnail */}
          <Thumbnail />
          {/* Categorization */}
          <Categorization />
        </div>
      </div>
    </main>
  );
};

export default EditCourse;
