/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import IconButton from "@/components/ui/IconButton";
import UploadForm from "./UploadForm";

import { CreateCourse } from "@/services/courses/types";
import { courseClientService } from "@/services/courses/courses.client.service";
import { Category } from "@/services/categories/types";

interface CreateCourseFormProps {
  categories: Category[];
}

export default function CreateCourseForm({
  categories,
}: CreateCourseFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateCourse>({
    title: "",
    description: "",
    price: 0,
    thumbnailId: "",
    categoryIds: [],
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.thumbnailId) {
      alert("من فضلك ارفع صورة الكورس أولاً");
      return;
    }

    try {
      setLoading(true);

      await courseClientService.createCourse(formData);

      router.push("/teacher/courses");
    } catch (error: any) {
      console.error("Create course error:", error);

      alert(error?.message || "فشل إنشاء الكورس، حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-5xl space-y-6">
      {/* Basic Information */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700">
            Basic Information
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Provide the basic information about your course.
          </p>
        </div>

        <div className="grid gap-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Course Title
            </label>

            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="e.g. NestJS Backend Development"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={5}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Describe what students will learn in this course..."
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {/* Price */}
          <div className="max-w-sm">
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Course Price
            </label>

            <div className="relative">
              <input
                id="price"
                type="number"
                min={0}
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                placeholder="500"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 pr-14 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                EGP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700">Categories</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Select the categories that best describe your course.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const checked =
              formData.categoryIds?.includes(category.id) ?? false;

            return (
              <label
                key={category.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <input
                  type="checkbox"
                  value={category.id}
                  checked={checked}
                  onChange={(e) => {
                    setFormData((prev) => {
                      const categoryIds = prev.categoryIds ?? [];

                      return {
                        ...prev,
                        categoryIds: e.target.checked
                          ? [...categoryIds, category.id]
                          : categoryIds.filter((id) => id !== category.id),
                      };
                    });
                  }}
                  className="h-4 w-4 accent-primary"
                />

                <span className="text-sm font-medium text-slate-700">
                  {category.name}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Thumbnail */}
      <UploadForm
        value={formData.thumbnailId}
        onChange={(fileId) =>
          setFormData((prev) => ({
            ...prev,
            thumbnailId: fileId,
          }))
        }
        title="Course Thumbnail"
        description="Add an attractive thumbnail for your course."
        uploadText="Upload Course Thumbnail"
        helperText="PNG, JPG or WEBP · Recommended 1280 × 720"
        folder="educore/course-thumbnails"
      />
      {/* Actions */}
      <div className="flex justify-end gap-3 pb-4">
        <Link
          href="/teacher/courses"
          className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>

        <IconButton
          type="submit"
          Icon={Plus}
          text={loading ? "Creating..." : "Create Course"}
          disabled={loading}
          className="bg-primary text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form>
  );
}
