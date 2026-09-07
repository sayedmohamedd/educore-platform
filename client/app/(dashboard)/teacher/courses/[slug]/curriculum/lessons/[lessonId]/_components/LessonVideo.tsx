"use client";

import { useState } from "react";
import { Loader2, Video, X } from "lucide-react";

import { mediaService } from "@/services/media/media.service";

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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleVideoUpload = (media: { id: string; url: string }) => {
    if (!media.id || !media.url) {
      onChange("videoId", "");
      onChange("videoUrl", "");
      onChange("duration", 0);

      return;
    }

    onChange("videoId", media.id);
    onChange("videoUrl", media.url);
  };

  const handleVideoMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>,
  ) => {
    const durationInSeconds = event.currentTarget.duration;

    if (!Number.isFinite(durationInSeconds)) return;

    const durationInMinutes = Math.ceil(durationInSeconds / 60);

    onChange("duration", durationInMinutes);
  };

  const handleDeleteVideo = async () => {
    if (!data.videoId || isDeleting) return;

    try {
      setIsDeleting(true);

      await mediaService.delete(data.videoId);

      onChange("videoId", "");
      onChange("videoUrl", "");
      onChange("duration", 0);
    } catch (error) {
      console.error("Failed to delete video:", error);
    } finally {
      setIsDeleting(false);
    }
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
        {/* Video / Upload */}
        {data.videoUrl ? (
          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-black">
            <video
              src={data.videoUrl}
              controls
              preload="metadata"
              onLoadedMetadata={handleVideoMetadata}
              className="aspect-video w-full"
            >
              Your browser does not support the video tag.
            </video>

            <button
              type="button"
              onClick={handleDeleteVideo}
              disabled={isDeleting}
              className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Delete video"
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <X className="size-4" />
              )}
            </button>
          </div>
        ) : (
          <UploadForm
            accept="video/mp4,video/webm,video/ogg"
            value={data.videoId}
            onChange={(mediaId) => {
              onChange("videoId", mediaId);
            }}
            onUploaded={handleVideoUpload}
            showPreview={false}
            title="Lesson Video"
            description="Upload the video students will watch in this lesson."
            uploadText="Upload Lesson Video"
            helperText="MP4, WEBM or OGV · Recommended 1280 × 720"
            folder="educore/lesson-videos"
          />
        )}

        {/* Video URL */}
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
            readOnly
            placeholder="Video URL will appear after upload"
            className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none"
          />

          <p className="mt-1.5 text-xs text-muted-foreground">
            This URL is generated automatically after uploading the video.
          </p>
        </div>

        {/* Duration */}
        <div className="max-w-sm">
          <label
            htmlFor="lesson-duration"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Duration
          </label>

          <div className="flex h-10.5 items-center rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600">
            {data.duration > 0
              ? `${data.duration} minute${data.duration === 1 ? "" : "s"}`
              : "Duration will be detected automatically"}
          </div>

          <p className="mt-1.5 text-xs text-muted-foreground">
            Duration is detected automatically from the uploaded video.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LessonVideo;
