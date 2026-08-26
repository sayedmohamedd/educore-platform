/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useState } from "react";
import { ImagePlus, Plus } from "lucide-react";
import Link from "next/link";

import IconButton from "@/components/ui/IconButton";
import { courseService, CreateCourse } from "@/services/courses.service";

// export type Category = {
//   id: string;
//   name: string;
// };

// export type Teacher = {
//   id: string;
//   userId: string;
//   bio: string;
//   title: string;
//   expertise: string;
//   [key: string]: any; // لو فيه خصائص تانية في الـ Teacher مش ظاهرة كلها
// };

// export type Course = {
//   id: string;
//   title: string;
//   description: string;
//   price: string;
//   status: string; // أو ممكن تقلبها Enum لو حابب ('DRAFT' | 'PUBLISHED')
//   teacherId: string;
//   thumbnailId: string;
//   createdAt: string;
//   updatedAt: string;
//   categories: Category[];
//   sections?: any[]; // ممكن تغيرها لـ Type الخاص بالسكشنز لما تعمله
//   teacher: Teacher;
// };

const UpdateCourseForm = ({ course }: { course: any }) => {
  const [formData, setFormData] = useState<CreateCourse>({
    title: course?.title,
    description: course?.description,
    price: course?.price,
    thumbnail: "",
    categoryIds: course?.categories?.map((category: any) => category?.id),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await courseService.createCourse(formData);
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
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
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
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
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
                  setFormData({
                    ...formData,
                    price: Number(e.target.value),
                  })
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
          {course.categories.map((category: any) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 p-4 transition hover:border-primary/30 hover:bg-primary/5"
            >
              <input
                type="checkbox"
                value={category.id}
                checked={formData.categoryIds?.includes(category.id)}
                onChange={(e) => {
                  const categoryIds = formData.categoryIds ?? [];

                  setFormData({
                    ...formData,
                    categoryIds: e.target.checked
                      ? [...categoryIds, category.id]
                      : categoryIds.filter((id) => id !== category.id),
                  });
                }}
                className="h-4 w-4 accent-primary"
              />

              <span className="text-sm font-medium text-slate-700">
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Thumbnail */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
          className="group flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <ImagePlus className="h-6 w-6 text-primary" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Upload Course Thumbnail
          </span>

          <span className="mt-1 text-xs text-muted-foreground">
            PNG, JPG or WEBP · Recommended 1280 × 720
          </span>

          <input
            id="thumbnail"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />
        </label>
      </section>

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
          text="Create Course"
          className="bg-primary text-white hover:bg-secondary"
        />
      </div>
    </form>
  );
};

export default UpdateCourseForm;
