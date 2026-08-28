/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Video,
} from "lucide-react";

import { courseClientService } from "@/services/courses/courses.service";
import { CreateLessonInput, CurriculumSection } from "./types";
import AddLessonForm from "./AddLessonForm";
import Link from "next/link";

interface SectionItemProps {
  section: CurriculumSection;
  index: number;

  onLessonCreated: (
    sectionId: string,
    lesson: CurriculumSection["lessons"][number],
  ) => void;
}

const SectionItem = ({ section, index, onLessonCreated }: SectionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const [showLessonForm, setShowLessonForm] = useState(false);

  const [isCreatingLesson, setIsCreatingLesson] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleAddLesson = async (data: CreateLessonInput) => {
    try {
      setErrorMessage("");
      setIsCreatingLesson(true);

      const response = await courseClientService.addLesson(section.id, data);

      const newLesson = response?.lesson ?? response?.data ?? response;

      onLessonCreated(section.id, newLesson);

      setShowLessonForm(false);
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Failed to create lesson. Please try again.",
      );
    } finally {
      setIsCreatingLesson(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      {/* Section Header */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 sm:gap-3 sm:px-4 sm:py-4">
        <GripVertical
          size={18}
          className="hidden cursor-grab text-slate-400 sm:block"
        />

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="flex min-w-0 flex-1 items-center gap-3 text-start"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
            {index + 1}
          </span>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-700">
              {section.title}
            </p>

            <p className="text-xs text-muted-foreground">
              {section.lessons.length}{" "}
              {section.lessons.length === 1 ? "lesson" : "lessons"}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-white"
        >
          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-3 sm:p-4">
          {/* Error */}
          {errorMessage && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          {/* Lessons */}
          <div className="space-y-2">
            {section.lessons.map(
              (
                lesson: CurriculumSection["lessons"][number],
                lessonIndex: number,
              ) => (
                <Link
                  key={lesson.id}
                  href={`/teacher/courses/${section?.courseId}/lessons/${lesson.id}`}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3 transition hover:border-primary/30 hover:bg-primary/5 sm:gap-3 sm:px-4"
                >
                  <GripVertical
                    size={16}
                    className="hidden cursor-grab text-slate-400 sm:block"
                  />

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <Video size={16} className="text-muted-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {lessonIndex + 1}. {lesson.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-xs text-muted-foreground">
                        {lesson.duration
                          ? `${lesson.duration} min`
                          : "No video"}
                      </span>

                      {lesson.isFree && (
                        <span className="rounded-md bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                          Free Preview
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
                // <div
                //   key={lesson.id}
                //   className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3 transition hover:border-primary/30 hover:bg-primary/5 sm:gap-3 sm:px-4"
                // >
                //   <GripVertical
                //     size={16}
                //     className="hidden cursor-grab text-slate-400 sm:block"
                //   />

                //   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                //     <span className="text-xs font-semibold text-muted-foreground">
                //       {lessonIndex + 1}
                //     </span>
                //   </div>

                //   <div className="min-w-0 flex-1">
                //     <p className="truncate text-sm font-medium text-slate-700">
                //       {lesson.title}
                //     </p>

                //     <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                //       <span className="text-xs text-muted-foreground">
                //         {lesson.duration
                //           ? `${lesson.duration} min`
                //           : "No video"}
                //       </span>

                //       {lesson.isFree && (
                //         <span className="rounded-md bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                //           Free Preview
                //         </span>
                //       )}
                //     </div>
                //   </div>
                // </div>
              ),
            )}
          </div>

          {/* Add Lesson */}
          {showLessonForm ? (
            <AddLessonForm
              nextOrder={section.lessons.length}
              isLoading={isCreatingLesson}
              onSubmit={handleAddLesson}
              onCancel={() => setShowLessonForm(false)}
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowLessonForm(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 py-3 text-sm font-medium text-muted-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <Plus size={17} />
              Add Lesson
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
