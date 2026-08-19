import {
  BookOpen,
  CircleCheck,
  CirclePlay,
  LockKeyhole,
} from "lucide-react";

const lessons = [
  {
    title: "Lesson 1: Introduction to Cloud Design",
    duration: "12:00",
    status: "completed",
  },
  {
    title: "Lesson 2: Cloud Architecture Patterns",
    duration: "15:00",
    status: "in-progress",
  },
  {
    title: "Lesson 3: Designing for Scalability",
    duration: "20:00",
    status: "not-started",
  },
];

const CourseContent = () => {
  return (
    <section className="w-fit min-w-80 rounded-lg bg-white p-5 shadow-md h-fit">
      {/* Header */}
      <div className="flex-between">
        <h4 className="text-xl font-semibold text-slate-700">
          Course Content
        </h4>

        <BookOpen className="h-5 w-5 text-muted" />
      </div>

      {/* Module */}
      <div className="mt-6 flex-between border-b border-gray-100 pb-4">
        <h5 className="text-base font-semibold text-slate-700">
          Module 3: Cloud Design
        </h5>

        <span className="text-sm font-medium text-muted">4/6</span>
      </div>

      {/* Lessons */}
      <ul className="mt-4 flex flex-col gap-2">
        {lessons.map((lesson) => (
          <li
            key={lesson.title}
            className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            {lesson.status === "completed" && (
              <CircleCheck className="h-8 w-8 shrink-0 rounded-full bg-green-100 p-1.5 text-green-500" />
            )}

            {lesson.status === "in-progress" && (
              <CirclePlay className="h-8 w-8 shrink-0 rounded-full bg-blue-100 p-1.5 text-blue-500" />
            )}

            {lesson.status === "not-started" && (
              <LockKeyhole className="h-8 w-8 shrink-0 rounded-full bg-gray-100 p-1.5 text-gray-400" />
            )}

            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-sm font-medium leading-5 text-slate-700">
                {lesson.title}
              </p>

              <span className="text-xs text-muted">{lesson.duration}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CourseContent;