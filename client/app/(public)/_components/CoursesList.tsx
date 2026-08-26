/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "@/components/shared/cards/CourseCard";
import Link from "next/link";
const CoursesList = ({ courses }: { courses: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.slice(0, 3).map((course: any) => (
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
