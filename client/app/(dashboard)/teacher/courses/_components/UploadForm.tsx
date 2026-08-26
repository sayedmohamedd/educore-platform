/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, ChangeEvent } from "react";
import { ImagePlus, Loader2, CheckCircle2 } from "lucide-react";
import { mediaService } from "@/services/media.service"; // عدل المسار حسب مكان الملف عندك

interface UploadFormProps {
  onFileUpload: (publicUrl: string) => void;
}

export default function UploadForm({ onFileUpload }: UploadFormProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // إظهار معاينة محلية فورية للمستخدم
    setPreviewUrl(URL.createObjectURL(file));
    setIsUploaded(false);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file); // لازم يطابق الـ FileInterceptor('file') في الباك أند

      const data = await mediaService.upload(formData);

      // استخراج الـ URL حسب شكل الستركتشر اللي راجع من الـ Backend
      const publicUrl = data.url || data.data?.url || data.secure_url;

      if (publicUrl) {
        onFileUpload(publicUrl);
        setIsUploaded(true);
      }
    } catch (error: any) {
      console.error("File upload error:", error);
      alert(error.message || "فشل رفع الصورة، حاول مرة أخرى.");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-700">
          Course Thumbnail
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add an attractive thumbnail for your course.
        </p>
      </div>

      <label
        htmlFor="thumbnail"
        className="group relative flex min-h-64 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition hover:border-primary/40 hover:bg-primary/5"
      >
        {previewUrl ? (
          <div className="relative h-full w-full">
            <img
              src={previewUrl}
              alt="Thumbnail preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <ImagePlus className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Upload Course Thumbnail
            </span>
            <span className="mt-1 text-xs text-muted-foreground">
              PNG, JPG or WEBP · Recommended 1280 × 720
            </span>
          </>
        )}

        <input
          id="thumbnail"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {isUploaded && (
        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          <span>Image uploaded successfully!</span>
        </div>
      )}
    </div>
  );
}
