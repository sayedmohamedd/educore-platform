"use client";

import { useState } from "react";

import { CreateLessonInput } from "./types";

interface AddLessonFormProps {
  nextOrder: number;
  isLoading: boolean;

  onSubmit: (data: CreateLessonInput) => void;
  onCancel: () => void;
}

const AddLessonForm = ({
  nextOrder,
  isLoading,
  onSubmit,
  onCancel,
}: AddLessonFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [isFree, setIsFree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
      duration: Number(duration) || 0,
      order: nextOrder,
      isFree,
    });
  };

  return (
    <form className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-700">Add Lesson</h4>

        <p className="mt-1 text-xs text-muted-foreground">
          Add the lesson information before creating it.
        </p>
      </div>

      <div className="grid gap-4">
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. What is NestJS?"
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
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            placeholder="Describe what students will learn in this lesson..."
            className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Video + Duration */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="video-url"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Video URL
            </label>

            <input
              id="video-url"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={isLoading}
              placeholder="https://..."
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Duration (minutes)
            </label>

            <input
              id="duration"
              type="number"
              min={0}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              disabled={isLoading}
              placeholder="30"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Free Preview */}
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
          <input
            type="checkbox"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
            disabled={isLoading}
            className="h-4 w-4 accent-primary"
          />

          <div>
            <p className="text-sm font-medium text-slate-700">Free Preview</p>

            <p className="text-xs text-muted-foreground">
              Allow students to watch this lesson for free.
            </p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading || !title.trim()}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Lesson"}
        </button>
      </div>
    </form>
  );
};

export default AddLessonForm;
