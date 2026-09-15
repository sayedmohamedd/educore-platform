import { Enrollment } from "@/services/courses/types";
import LearningCourseCard from "./LearningCourseCard";

const MyCoursesList = ({ enrollments }: { enrollments: Enrollment[] }) => {
  if (enrollments.length === 0) {
    return <div className="text-center py-10">لا توجد كورسات حالياً</div>;
  }
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {enrollments.map((enrollment: Enrollment) => (
        <LearningCourseCard key={enrollment.id} enrollment={enrollment} />
      ))}
    </div>
  );
};

export default MyCoursesList;
