"use client";

import {
  BarChart3,
  FolderTree,
  GraduationCap,
  Pencil,
  Trash2,
} from "lucide-react";
import type { CategoryWithCoursesCount } from "@/services/categories/types";
import IconButton from "@/components/ui/IconButton";

interface Props {
  category: CategoryWithCoursesCount;
  onEdit: (category: CategoryWithCoursesCount) => void;
  onDelete: (category: CategoryWithCoursesCount) => void;
}

const CategoryCard = ({ category, onEdit, onDelete }: Props) => {
  const coursesCount = category.coursesCount ?? 0;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <FolderTree className="size-5 text-primary" />
        </div>

        <div className="rounded-lg bg-slate-50 p-2 text-slate-400">
          <BarChart3 className="size-4" />
        </div>
      </div>

      <div className="mt-5">
        <h4 className="truncate text-lg font-semibold text-slate-700">
          {category.name}
        </h4>

        <p className="mt-1 min-h-10 text-sm leading-5 text-muted-foreground">
          {category.description || "No description available."}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="size-4" />

          <span>
            {coursesCount} {coursesCount === 1 ? "course" : "courses"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <IconButton
          type="button"
          onClick={() => onEdit(category)}
          className="flex-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </IconButton>

        <IconButton
          type="button"
          onClick={() => onDelete(category)}
          className="flex-1 bg-red-50 text-red-500 hover:bg-red-100"
        >
          <Trash2 className="mr-2 size-4" />
          Delete
        </IconButton>
      </div>
    </article>
  );
};

export default CategoryCard;
