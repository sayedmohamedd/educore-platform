/* eslint-disable @next/next/no-img-element */
import { BookOpen, Clock3, GraduationCap, PlayCircle } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  duration: string;
  image: string;
}

const MyCourses = () => {
  const courses: Course[] = [
    {
      id: "1",
      title: "Complete React & Next.js Course",
      instructor: "Ahmed Mohamed",
      progress: 72,
      lessonsCompleted: 18,
      totalLessons: 25,
      duration: "12h 30m",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    },
    {
      id: "2",
      title: "Node.js & NestJS Backend Development",
      instructor: "Mohamed Ali",
      progress: 45,
      lessonsCompleted: 9,
      totalLessons: 20,
      duration: "10h 15m",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    },
    {
      id: "3",
      title: "PostgreSQL & Database Design",
      instructor: "Omar Hassan",
      progress: 100,
      lessonsCompleted: 16,
      totalLessons: 16,
      duration: "7h 40m",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    },
  ];

  const totalCourses = courses.length;

  const completedCourses = courses.filter(
    (course) => course.progress === 100,
  ).length;

  const inProgressCourses = courses.filter(
    (course) => course.progress > 0 && course.progress < 100,
  ).length;

  const totalLessons = courses.reduce(
    (total, course) => total + course.totalLessons,
    0,
  );

  return (
    <main className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-700">My Courses</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Continue learning and keep track of your progress.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Enrolled Courses</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-700">
                {totalCourses}
              </h3>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-700">
                {inProgressCourses}
              </h3>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <PlayCircle className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-700">
                {completedCourses}
              </h3>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <GraduationCap className="size-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Lessons</p>

              <h3 className="mt-2 text-2xl font-bold text-slate-700">
                {totalLessons}
              </h3>
            </div>

            <div className="flex size-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Clock3 className="size-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="mt-8">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-700">Your Courses</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Pick up where you left off.
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {course.progress === 100 && (
                    <div className="absolute right-3 top-3 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                      Completed
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="line-clamp-2 min-h-12 text-base font-semibold text-slate-700">
                    {course.title}
                  </h4>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {course.instructor}
                  </p>

                  {/* Course Info */}
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {course.lessonsCompleted}/{course.totalLessons} lessons
                    </span>

                    <span>{course.duration}</span>
                  </div>

                  {/* Progress */}
                  <div className="mt-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600">
                        Progress
                      </span>

                      <span className="text-xs font-semibold text-primary">
                        {course.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${course.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    href={`/my-courses/${course.title}`}
                    className="cursor-pointer mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
                  >
                    <PlayCircle className="size-4" />

                    {course.progress === 100
                      ? "Review Course"
                      : "Continue Learning"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-5" />
            </div>

            <h4 className="font-semibold text-slate-700">No courses yet</h4>

            <p className="mt-1 text-sm text-muted-foreground">
              You are not enrolled in any courses yet.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
            >
              Browse Courses
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyCourses;
