"use client";

import { Video } from "lucide-react";

import { LessonEditorData } from "./types";
import UploadForm from "@/app/(dashboard)/teacher/courses/_components/UploadForm";

interface LessonVideoProps {
  data: LessonEditorData;

  onChange: <K extends keyof LessonEditorData>(
    field: K,
    value: LessonEditorData[K],
  ) => void;
}

const LessonVideo = ({ data, onChange }: LessonVideoProps) => {
  const handleVideoUpload = (publicUrl: string) => {
    onChange("videoUrl", publicUrl);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-700">
          <Video size={20} />
          Lesson Video
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Upload the video students will watch in this lesson.
        </p>
      </div>

      <div className="space-y-5">
        {/* Current video */}
        {data.videoUrl && (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <video
              src={data.videoUrl}
              controls
              className="aspect-video w-full"
            />
          </div>
        )}

        {/* Upload */}
        <UploadForm
          value={data.videoUrl}
          onChange={(fileId) => handleVideoUpload(fileId)}
          title="Lesson Video"
          description="Upload the video students will watch in this lesson."
          uploadText="Upload Lesson Video"
          helperText="MP4, WEBM or OGV · Recommended 1280 × 720"
          folder="educore/lesson-videos"
        />

        {/* Or URL */}
        <div>
          <label
            htmlFor="lesson-video-url"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Video URL
          </label>

          <input
            id="lesson-video-url"
            type="url"
            value={data.videoUrl}
            onChange={(e) => onChange("videoUrl", e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {/* Duration */}
        <div className="max-w-sm">
          <label
            htmlFor="lesson-duration"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Duration (minutes)
          </label>

          <input
            id="lesson-duration"
            type="number"
            min={0}
            value={data.duration}
            onChange={(e) => onChange("duration", Number(e.target.value))}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>
    </section>
  );
};

export default LessonVideo;
