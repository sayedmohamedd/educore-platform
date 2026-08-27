"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  GripVertical,
  Plus,
  Trash2,
  Video,
  X,
} from "lucide-react";
import IconButton from "@/components/ui/IconButton";

type Lesson = {
  id: string;
  title: string;
  duration: number;
  isFree: boolean;
};

type Section = {
  id: string;
  title: string;
  lessons: Lesson[];
};

const mockSections: Section[] = [
  {
    id: "section-1",
    title: "Introduction to NestJS",
    lessons: [
      {
        id: "lesson-1",
        title: "What is NestJS?",
        duration: 20,
        isFree: true,
      },
      {
        id: "lesson-2",
        title: "Controllers and Services",
        duration: 35,
        isFree: false,
      },
    ],
  },
  {
    id: "section-2",
    title: "Prisma and PostgreSQL",
    lessons: [
      {
        id: "lesson-3",
        title: "Prisma with PostgreSQL",
        duration: 45,
        isFree: false,
      },
    ],
  },
];

const CurriculumBuilder = ({ courseId }: { courseId: string }) => {
  const [sections, setSections] = useState<Section[]>(mockSections);

  const [expandedSections, setExpandedSections] = useState<string[]>(
    mockSections.map((section) => section.id),
  );

  const [showSectionForm, setShowSectionForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState<string | null>(null);

  const [sectionTitle, setSectionTitle] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const addSection = () => {
    if (!sectionTitle.trim()) return;

    const newSection: Section = {
      id: crypto.randomUUID(),
      title: sectionTitle,
      lessons: [],
    };

    setSections((prev) => [...prev, newSection]);
    setExpandedSections((prev) => [...prev, newSection.id]);

    setSectionTitle("");
    setShowSectionForm(false);
  };

  const addLesson = (sectionId: string) => {
    if (!lessonTitle.trim()) return;

    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      title: lessonTitle,
      duration: 0,
      isFree: false,
    };

    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: [...section.lessons, newLesson],
            }
          : section,
      ),
    );

    setLessonTitle("");
    setShowLessonForm(null);
  };

  const deleteSection = (sectionId: string) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const deleteLesson = (sectionId: string, lessonId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter(
                (lesson) => lesson.id !== lessonId,
              ),
            }
          : section,
      ),
    );
  };

  return (
    <div className="mt-8 max-w-5xl">
      {/* Course Info */}
      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="mb-1 text-sm text-muted-foreground">
              Course Curriculum
            </p>

            <h3 className="text-lg font-semibold text-slate-700">
              NestJS Backend Development
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Build production-ready REST APIs using NestJS, Prisma and
              PostgreSQL.
            </p>
          </div>

          <div className="shrink-0 text-start sm:text-end">
            <p className="text-sm text-muted-foreground">Sections</p>

            <p className="text-2xl font-semibold text-slate-700">
              {sections.length}
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-700">
              Course Content
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Create sections and add lessons to build your curriculum.
            </p>
          </div>

          <IconButton
            Icon={Plus}
            text="Add Section"
            onClick={() => setShowSectionForm(true)}
            className="w-full bg-primary text-white hover:bg-secondary sm:w-auto"
          />
        </div>

        {/* Add Section */}
        {showSectionForm && (
          <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="e.g. Introduction to NestJS"
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addSection}
                  className="flex-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary sm:flex-none"
                >
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSectionForm(false);
                    setSectionTitle("");
                  }}
                  className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => {
            const isExpanded = expandedSections.includes(section.id);

            return (
              <div
                key={section.id}
                className="overflow-hidden rounded-xl border border-slate-200"
              >
                {/* Section Header */}
                <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-3 sm:gap-3 sm:px-4 sm:py-4">
                  <GripVertical
                    size={18}
                    className="hidden cursor-grab text-slate-400 sm:block"
                  />

                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
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

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-primary"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteSection(section.id)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-white"
                    >
                      {isExpanded ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Lessons */}
                {isExpanded && (
                  <div className="p-3 sm:p-4">
                    <div className="space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-3 transition hover:border-primary/30 hover:bg-primary/5 sm:gap-3 sm:px-4"
                        >
                          <GripVertical
                            size={16}
                            className="hidden cursor-grab text-slate-400 sm:block"
                          />

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <Video
                              size={16}
                              className="text-muted-foreground"
                            />
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

                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-primary"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteLesson(section.id, lesson.id)
                              }
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Lesson */}
                    {showLessonForm === section.id ? (
                      <div className="mt-3 rounded-lg bg-slate-50 p-3">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <input
                            value={lessonTitle}
                            onChange={(e) => setLessonTitle(e.target.value)}
                            placeholder="e.g. What is NestJS?"
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                          />

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => addLesson(section.id)}
                              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-secondary sm:flex-none"
                            >
                              Add Lesson
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setShowLessonForm(null);
                                setLessonTitle("");
                              }}
                              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-slate-600 transition hover:bg-slate-50"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowLessonForm(section.id)}
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
          })}
        </div>

        {/* Empty State */}
        {sections.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Plus className="text-primary" size={22} />
            </div>

            <h4 className="font-semibold text-slate-700">No sections yet</h4>

            <p className="mt-1 px-4 text-sm text-muted-foreground">
              Start building your curriculum by adding the first section.
            </p>
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 py-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="w-full rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
        >
          Save as Draft
        </button>

        <IconButton
          Icon={Plus}
          text="Continue"
          className="w-full bg-primary text-white hover:bg-secondary sm:w-auto"
          onClick={() => {
            console.log("courseId:", courseId);
            console.log("sections:", sections);
          }}
        />
      </div>
    </div>
  );
};

export default CurriculumBuilder;
