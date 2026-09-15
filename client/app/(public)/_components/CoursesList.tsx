/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "@/components/shared/cards/CourseCard";
import { Course } from "@/services/courses/types";
import { Role } from "@/store/auth.store";
import Link from "next/link";
const CoursesList = ({ courses, role }: { courses: any[]; role?: Role }) => {
  if (!courses || courses.length === 0) {
    return <div className="text-center py-10">لا توجد كورسات متاحة حالياً</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course: any) => (
        <CourseCard
          teacher={course?.teacher?.user?.fullName}
          key={course?.id}
          id={course?.id}
          title={course?.title}
          status={course?.status}
          thumbnail={course?.thumbnail}
          thumbnailId={course?.thumbnailId}
          description={course?.description}
          price={course?.price}
          actions={actions(course, role)}
        />
      ))}
    </div>
  );
};

export default CoursesList;

const actions = (course: Course, role?: Role) => {
  switch (role) {
    case Role.TEACHER:
      return (
        <Link
          href={`/teacher/courses/${course?.slug}/edit`}
          className="btn bg-primary text-white hover:bg-primary/80 transition duration-300"
        >
          Edit
        </Link>
      );
    case Role.STUDENT:
      return course.enrolled ? (
        <Link
          href={`/my-courses/${course?.slug}`}
          className="btn bg-primary text-white hover:bg-primary/80 transition duration-300"
        >
          continue learning
        </Link>
      ) : (
        <Link
          href={`/courses/${course?.slug}`}
          className="btn bg-primary text-white hover:bg-primary/80 transition duration-300"
        >
          View Details
        </Link>
      );
    default:
      return (
        <Link
          href={`/courses/${course?.slug}`}
          className="btn bg-primary text-white hover:bg-primary/80 transition duration-300"
        >
          View Details
        </Link>
      );
  }
};
