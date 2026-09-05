/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  X,
  XCircle,
} from "lucide-react";

import { AdminCourse } from "./typs";

type CoursePreviewProps = {
  course: AdminCourse;
  onClose: () => void;
};

const formatDuration = (seconds: number) => {
  if (!seconds) return "0 min";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }

  return `${minutes} min`;
};

const CoursePreview = ({ course, onClose }: CoursePreviewProps) => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const totalLessons = course.sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );

  const toggleSection = (sectionId: string) => {
    setOpenSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId],
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-700">Course Preview</h2>

            <p className="mt-1 text-sm text-slate-500">
              Review course information and content
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          {/* Course Info */}
          <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-[280px_1fr]">
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-xl bg-slate-100">
              {course.thumbnail?.url ? (
                <img
                  src={course.thumbnail.url}
                  alt={course.title}
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center text-slate-400">
                  <BookOpen size={40} />
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h3 className="text-xl font-bold text-slate-700">
                {course.title}
              </h3>

              {course.description && (
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {course.description}
                </p>
              )}

              {/* Teacher */}
              <div className="mt-5 flex items-center gap-3">
                {course.teacher.user.avatar?.url ? (
                  <img
                    loading="lazy"
                    src={course.teacher.user.avatar.url}
                    alt={course.teacher.user.fullName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
                    {course.teacher.user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <p className="text-xs text-slate-400">Instructor</p>

                  <p className="text-sm font-semibold text-slate-700">
                    {course.teacher.user.fullName}
                  </p>

                  <p className="text-xs text-slate-400">
                    {course.teacher.user.email}
                  </p>
                </div>
              </div>

              {/* Categories */}
              {course.categories.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.categories.map(({ category }) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta */}
              <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{course.sections.length} sections</span>
                </div>

                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{totalLessons} lessons</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={16} />
                  <span>{formatDuration(course.duration)}</span>
                </div>

                <span className="font-semibold text-slate-700">
                  ${course.price}
                </span>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div className="border-t border-slate-200 px-5 py-5">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-700">
                Course Content
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {course.sections.length} sections · {totalLessons} lessons
              </p>
            </div>

            {course.sections.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                <BookOpen size={28} className="mx-auto text-slate-300" />

                <p className="mt-3 text-sm text-slate-500">
                  No sections available.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {course.sections.map((section) => {
                  const isOpen = openSections.includes(section.id);

                  return (
                    <div
                      key={section.id}
                      className="overflow-hidden rounded-xl border border-slate-200"
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        className="flex w-full items-center justify-between gap-4 bg-slate-50 px-4 py-4 text-left transition hover:bg-slate-100"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {section.order + 1}. {section.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {section.lessons.length} lessons
                          </p>
                        </div>

                        {isOpen ? (
                          <ChevronUp
                            size={18}
                            className="shrink-0 text-slate-400"
                          />
                        ) : (
                          <ChevronDown
                            size={18}
                            className="shrink-0 text-slate-400"
                          />
                        )}
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-slate-100">
                          {section.lessons.length === 0 ? (
                            <p className="px-4 py-4 text-sm text-slate-400">
                              No lessons in this section.
                            </p>
                          ) : (
                            section.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center gap-3 px-4 py-3"
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-medium text-slate-500">
                                  {lesson.order + 1}
                                </div>

                                <p className="text-sm font-medium text-slate-700">
                                  {lesson.title}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
          {course.status === "SUBMITTED" && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <XCircle size={16} />
                Reject
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                <CheckCircle2 size={16} />
                Approve
              </button>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
