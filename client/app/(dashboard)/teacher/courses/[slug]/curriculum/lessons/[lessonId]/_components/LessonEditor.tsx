/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import Link from "next/link";

import IconButton from "@/components/ui/IconButton";
import { courseClientService } from "@/services/courses/courses.service";

import { Lesson, LessonEditorData } from "./types";
import LessonBasicInfo from "./LessonBasicInfo";
import LessonVideo from "./LessonVideo";

interface LessonEditorProps {
  lesson: Lesson;
  courseId: string;
}

const LessonEditor = ({ lesson, courseId }: LessonEditorProps) => {
  const [formData, setFormData] = useState<LessonEditorData>({
    title: lesson.title ?? "",
    description: lesson.description ?? "",
    videoUrl: lesson.videoUrl ?? "",
    duration: lesson.duration ?? 0,
    isFree: lesson.isFree ?? false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = <K extends keyof LessonEditorData>(
    field: K,
    value: LessonEditorData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setErrorMessage("Lesson title is required.");
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");
      setIsSaving(true);

      await courseClientService.updateLesson(lesson.id, {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        videoUrl: formData.videoUrl.trim() || undefined,
        duration: formData.duration,
        isFree: formData.isFree,
      });

      setSuccessMessage("Lesson updated successfully.");
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Failed to update lesson. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-8 max-w-5xl space-y-6">
      {/* Error */}
      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </div>
      )}

      {/* Basic Information */}
      <LessonBasicInfo data={formData} onChange={updateField} />

      {/* Video */}
      <LessonVideo data={formData} onChange={updateField} />

      {/* Lesson Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700">
            Lesson Settings
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Configure how students can access this lesson.
          </p>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-primary/5">
          <input
            type="checkbox"
            checked={formData.isFree}
            onChange={(e) => updateField("isFree", e.target.checked)}
            className="mt-1 h-4 w-4 accent-primary"
          />

          <div>
            <p className="text-sm font-medium text-slate-700">Free Preview</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Allow students to watch this lesson before enrolling in the
              course.
            </p>
          </div>
        </label>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 pb-6 sm:flex-row sm:justify-end">
        <Link
          href={`/teacher/courses/${courseId}/curriculum`}
          className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:w-auto"
        >
          Cancel
        </Link>

        <IconButton
          Icon={Save}
          text={isSaving ? "Saving..." : "Save Changes"}
          disabled={isSaving}
          onClick={handleSave}
          className="w-full bg-primary text-white hover:bg-secondary sm:w-auto"
        />
      </div>
    </div>
  );
};

export default LessonEditor;
