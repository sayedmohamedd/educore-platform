"use client";

import {
  BookOpen,
  CheckCircle2,
  CirclePlay,
  FileText,
  LockKeyhole,
  ClipboardCheck,
} from "lucide-react";
import { useState } from "react";

type LessonStatus = "completed" | "in-progress" | "not-started";

type Lesson = {
  id: string;
  title: string;
  duration: string;
  status: LessonStatus;

  quiz?: {
    id: string;
    title: string;
    completed: boolean;
    required: boolean;
  };

  assignment?: {
    id: string;
    title: string;
    submitted: boolean;
    passed: boolean;
    required: boolean;
  };
};

type Section = {
  id: string;
  title: string;
  completed: number;
  total: number;
  lessons: Lesson[];
};

const sections: Section[] = [
  {
    id: "section-1",
    title: "Section 1: Introduction",
    completed: 3,
    total: 4,
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to the Course",
        duration: "08:20",
        status: "completed",
      },
      {
        id: "lesson-2",
        title: "Understanding the Fundamentals",
        duration: "14:30",
        status: "completed",
        quiz: {
          id: "quiz-1",
          title: "Fundamentals Quiz",
          completed: true,
          required: true,
        },
      },
      {
        id: "lesson-3",
        title: "Core Concepts",
        duration: "18:45",
        status: "completed",
        assignment: {
          id: "assignment-1",
          title: "Core Concepts Assignment",
          submitted: true,
          passed: true,
          required: true,
        },
      },
      {
        id: "lesson-4",
        title: "Section Review",
        duration: "12:10",
        status: "in-progress",
        quiz: {
          id: "quiz-2",
          title: "Section Review Quiz",
          completed: false,
          required: true,
        },
      },
    ],
  },
  {
    id: "section-2",
    title: "Section 2: Advanced Concepts",
    completed: 1,
    total: 3,
    lessons: [
      {
        id: "lesson-5",
        title: "Advanced System Architecture",
        duration: "20:00",
        status: "not-started",
      },
      {
        id: "lesson-6",
        title: "Scalability and Performance",
        duration: "16:40",
        status: "not-started",
        assignment: {
          id: "assignment-2",
          title: "Scalability Assignment",
          submitted: false,
          passed: false,
          required: true,
        },
      },
      {
        id: "lesson-7",
        title: "Production Architecture",
        duration: "22:15",
        status: "not-started",
      },
    ],
  },
];

const CourseContent = () => {
  const [activeLesson, setActiveLesson] = useState("lesson-4");

  const isLessonUnlocked = (lesson: Lesson, index: number) => {
    if (lesson.status !== "not-started") {
      return true;
    }

    if (index === 0) {
      return true;
    }

    return true;
  };

  const handleLessonClick = (lesson: Lesson, index: number) => {
    if (!isLessonUnlocked(lesson, index)) {
      return;
    }

    setActiveLesson(lesson.id);
  };

  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-80">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-700">
                Course Content
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                4 of 10 lessons completed
              </p>
            </div>

            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="size-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-b border-slate-100 last:border-b-0"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between px-5 py-4">
                <h3 className="text-sm font-semibold text-slate-700">
                  {section.title}
                </h3>

                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  {section.completed}/{section.total}
                </span>
              </div>

              {/* Lessons */}
              <ul className="space-y-1 px-3 pb-3">
                {section.lessons.map((lesson, index) => {
                  const isActive = activeLesson === lesson.id;
                  const unlocked = isLessonUnlocked(lesson, index);

                  return (
                    <li key={lesson.id}>
                      <button
                        type="button"
                        disabled={!unlocked}
                        onClick={() => handleLessonClick(lesson, index)}
                        className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                          isActive
                            ? "bg-primary/10"
                            : unlocked
                              ? "hover:bg-slate-50"
                              : ""
                        } ${
                          !unlocked
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }`}
                      >
                        {/* Lesson Status */}
                        <div className="shrink-0 pt-0.5">
                          {lesson.status === "completed" && (
                            <CheckCircle2 className="size-8 rounded-full bg-green-100 p-1.5 text-green-500" />
                          )}

                          {lesson.status === "in-progress" && (
                            <CirclePlay className="size-8 rounded-full bg-primary/10 p-1.5 text-primary" />
                          )}

                          {lesson.status === "not-started" && (
                            <LockKeyhole className="size-8 rounded-full bg-slate-100 p-1.5 text-slate-400" />
                          )}
                        </div>

                        {/* Lesson Content */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`line-clamp-2 text-sm font-medium leading-5 ${
                              isActive ? "text-primary" : "text-slate-700"
                            }`}
                          >
                            {lesson.title}
                          </p>

                          <span className="mt-1 block text-xs text-muted-foreground">
                            {lesson.duration}
                          </span>

                          {/* Assessments */}
                          {(lesson.quiz || lesson.assignment) && (
                            <div className="mt-3 space-y-1.5">
                              {/* Quiz */}
                              {lesson.quiz && (
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`flex size-6 items-center justify-center rounded-md ${
                                      lesson.quiz.completed
                                        ? "bg-green-100"
                                        : "bg-primary/10"
                                    }`}
                                  >
                                    <ClipboardCheck
                                      className={`size-3.5 ${
                                        lesson.quiz.completed
                                          ? "text-green-600"
                                          : "text-primary"
                                      }`}
                                    />
                                  </div>

                                  <span
                                    className={`text-xs ${
                                      lesson.quiz.completed
                                        ? "text-green-600"
                                        : "text-muted-foreground"
                                    }`}
                                  >
                                    {lesson.quiz.completed
                                      ? "Quiz completed"
                                      : "Quiz required"}
                                  </span>
                                </div>
                              )}

                              {/* Assignment */}
                              {lesson.assignment && (
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`flex size-6 items-center justify-center rounded-md ${
                                      lesson.assignment.passed
                                        ? "bg-green-100"
                                        : "bg-orange-100"
                                    }`}
                                  >
                                    <FileText
                                      className={`size-3.5 ${
                                        lesson.assignment.passed
                                          ? "text-green-600"
                                          : "text-orange-500"
                                      }`}
                                    />
                                  </div>

                                  <span
                                    className={`text-xs ${
                                      lesson.assignment.passed
                                        ? "text-green-600"
                                        : "text-orange-600"
                                    }`}
                                  >
                                    {lesson.assignment.passed
                                      ? "Assignment passed"
                                      : lesson.assignment.submitted
                                        ? "Assignment under review"
                                        : "Assignment required"}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default CourseContent;
