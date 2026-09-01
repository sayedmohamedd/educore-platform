/* eslint-disable @next/next/no-img-element */
import { Enrollment } from "@/services/courses/types";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

const MyCoursesList = ({ enrollments }: { enrollments: Enrollment[] }) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {enrollments.map((enrollment: Enrollment) => (
        <article
          key={enrollment.id}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden bg-slate-100">
            <img
              src={
                "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
              }
              // src={enrollment.course.meta?.image}
              alt={enrollment.course.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            {/* {enrollment.course?.progress === 100 && (
              <div className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                Completed
              </div>
            )} */}
          </div>

          {/* Content */}
          <div className="p-5">
            <h4 className="line-clamp-2 min-h-12 text-base font-semibold text-slate-700">
              {enrollment.course.title}
            </h4>

            <p className="mt-2 text-sm text-muted-foreground">
              {enrollment.course.teacher?.title}
            </p>

            {/* Course Info */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {/* {enrollment.course?.lessonsCompleted}/ */}
                5/
                {enrollment.course?.totalLessons} lessons
              </span>

              <span>{enrollment.course?.duration}</span>
            </div>

            {/* Progress */}
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-600">
                  Progress
                </span>

                <span className="text-xs font-semibold text-primary">
                  {/* {enrollments.course?.progress}% */}
                  80%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    // width: `${enrollments.course?.progress}%`,
                    width: "80%",
                  }}
                />
              </div>
            </div>

            {/* Action */}
            <Link
              href={`/my-courses/${enrollment.course.slug}`}
              className="cursor-pointer mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
            >
              <PlayCircle className="size-4" />
              {/* {enrollment.course?.progress === 100
                ? "Review Course"
                : "Continue Learning"} */}
              Continue Learning
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MyCoursesList;
