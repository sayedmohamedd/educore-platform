"use client";

import { LessonEditorData } from "./types";

interface LessonBasicInfoProps {
  data: LessonEditorData;

  onChange: <K extends keyof LessonEditorData>(
    field: K,
    value: LessonEditorData[K],
  ) => void;
}

const LessonBasicInfo = ({ data, onChange }: LessonBasicInfoProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700">
          Basic Information
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Configure the basic information of your lesson.
        </p>
      </div>

      <div className="grid gap-5">
        {/* Title */}
        <div>
          <label
            htmlFor="lesson-title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Lesson Title
          </label>

          <input
            id="lesson-title"
            type="text"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="e.g. Introduction to Controllers"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="lesson-description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="lesson-description"
            rows={6}
            value={data.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Explain what students will learn in this lesson..."
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>
    </section>
  );
};

export default LessonBasicInfo;
