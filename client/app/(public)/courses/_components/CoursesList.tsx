import CourseCard from "@/components/shared/cards/CourseCard";
import { Course } from "@/services/courses/types";
import Link from "next/link";

const CoursesList = async ({ courses }: { courses: Course[] }) => {
  // check if there are no courses
  if (!courses || courses.length === 0) {
    return <div className="text-center py-10">لا توجد كورسات متاحة حالياً</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
      {courses.map((course: Course) => (
        <CourseCard
          teacher={course?.teacher?.user?.fullName}
          key={course?.id}
          id={course?.id}
          title={course?.title}
          status={course?.status}
          thumbnailId={course?.thumbnailId}
          description={course?.description}
          price={course?.price}
          actions={
            <Link
              href={`/courses/${course?.slug}`}
              className="btn bg-primary text-white hover:bg-primary/80 transition duration-300"
            >
              View Details
            </Link>
          }
        />
      ))}
    </div>
  );
};

export default CoursesList;
