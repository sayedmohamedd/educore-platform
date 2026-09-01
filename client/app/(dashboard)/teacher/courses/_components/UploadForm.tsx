/* eslint-disable @next/next/no-img-element */
"use client";
import { ChangeEvent, useEffect, useId, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, X } from "lucide-react";
import {
  uploadToCloudinary,
  CloudinaryUploadResult,
} from "@/lib/cloudinary/upload";
import { mediaService } from "@/services/media/media.service";

interface FileUploadProps {
  value?: string;
  onChange: (fileId: string) => void;
  accept?: string;
  title?: string;
  description?: string;
  uploadText?: string;
  helperText?: string;
  folder?: string;
}

export default function UploadForm({
  value,
  onChange,
  accept = "image/png,image/jpeg,image/webp",
  title = "Upload Media",
  description = "Upload your media file.",
  uploadText = "Upload File",
  helperText = "PNG, JPG or WEBP",
  folder = "educore",
}: FileUploadProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setProgress(0);

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const localPreview = URL.createObjectURL(file);

    setPreviewUrl(localPreview);

    try {
      setUploading(true);

      // 1. Upload directly to Cloudinary
      const result: CloudinaryUploadResult = await uploadToCloudinary({
        file,
        folder,
        onProgress: setProgress,
      });

      // 2. Create Media record in backend
      const media = await mediaService.uploadMetadata({
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        filename: file.name,
        size: file.size,
        mimeType: file.type,
      });

      onChange(media.id);

      setProgress(100);
    } catch (error) {
      console.error("File upload error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to upload the file.",
      );

      setPreviewUrl(null);
      setProgress(0);
      onChange("");
    } finally {
      setUploading(false);

      e.target.value = "";
    }
  };

  const handleRemove = () => {
    if (uploading) return;

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setProgress(0);
    setError("");

    onChange("");
  };

  const isUploaded = Boolean(value) && !uploading;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Upload Area */}
      <div className="relative">
        <label
          htmlFor={inputId}
          className={`group relative flex min-h-64 overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition ${
            uploading
              ? "cursor-wait"
              : "cursor-pointer hover:border-primary/40 hover:bg-primary/5"
          }`}
        >
          {previewUrl ? (
            <div className="relative min-h-64 w-full">
              <img
                loading="lazy"
                src={previewUrl}
                alt="Preview"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

              {/* Upload Progress */}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs">
                  <div className="w-full max-w-sm px-6 text-white">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />

                        <span className="text-sm font-medium">
                          Uploading...
                        </span>
                      </div>

                      <span className="text-sm font-semibold">{progress}%</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/25">
                      <div
                        className="h-full rounded-full bg-white transition-[width] duration-200"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 text-center text-xs text-white/80">
                      Please wait while your file is being uploaded
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex min-h-64 w-full flex-col items-center justify-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10">
                <ImagePlus className="size-6 text-primary" />
              </div>

              <span className="text-sm font-semibold text-slate-700">
                {uploadText}
              </span>

              <span className="mt-1 text-xs text-muted-foreground">
                {helperText}
              </span>
            </div>
          )}

          <input
            id={inputId}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {/* Remove */}
        {previewUrl && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-500"
            aria-label="Remove file"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Success */}
      {isUploaded && (
        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 className="size-4" />

          <span>File uploaded successfully!</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
