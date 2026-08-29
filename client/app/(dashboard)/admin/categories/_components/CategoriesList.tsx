"use client";

import { useState } from "react";
import { BookOpen, FolderTree, Layers3, Plus, ShieldCheck } from "lucide-react";

import StatsCard from "@/components/shared/cards/StatsCard";
import Button from "@/components/ui/Button";

import type { Category } from "@/services/categories/types";

import CategoryCard from "./CategoryCard";
import CreateCategoryDialog from "./CreateCategoryDialog";
import IconButton from "@/components/ui/IconButton";

interface Props {
  categories: Category[];
}

const CategoriesList = ({ categories: initialCategories }: Props) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const totalCategories = categories.length;

  const totalCourses = categories.reduce(
    (total, category) => total + (category.coursesCount ?? 0),
    0,
  );

  const activeCategories = categories.filter(
    (category) => (category.coursesCount ?? 0) > 0,
  ).length;

  const emptyCategories = categories.filter(
    (category) => (category.coursesCount ?? 0) === 0,
  ).length;

  const stats = [
    {
      title: "Total Categories",
      number: totalCategories.toString(),
      percentage: 0,
      Icon: FolderTree,
    },
    {
      title: "Active Categories",
      number: activeCategories.toString(),
      percentage: 0,
      Icon: Layers3,
    },
    {
      title: "Total Courses",
      number: totalCourses.toString(),
      percentage: 0,
      Icon: BookOpen,
    },
    {
      title: "Empty Categories",
      number: emptyCategories.toString(),
      percentage: 0,
      Icon: ShieldCheck,
    },
  ];

  const handleCreated = (category: Category) => {
    setCategories((current) => [category, ...current]);
  };

  const handleEdit = (category: Category) => {
    console.log("Edit category:", category.id);
  };

  const handleDelete = (category: Category) => {
    console.log("Delete category:", category.id);
  };

  return (
    <>
      {/* Header Actions */}
      <div className="mb-6 flex justify-end">
        <IconButton
          type="button"
          onClick={() => setShowCreateDialog(true)}
          className="bg-primary text-white hover:bg-secondary"
        >
          <Plus className="mr-2 size-4" />
          Add Category
        </IconButton>
      </div>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Categories */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-700">
            All Categories
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Browse and manage course categories.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FolderTree className="size-5 text-primary" />
            </div>

            <h4 className="font-semibold text-slate-700">
              No categories found
            </h4>

            <p className="mt-1 px-4 text-sm text-muted-foreground">
              There are no categories available yet.
            </p>
          </div>
        )}
      </section>

      {/* Analytics */}
      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700">
              Category Analytics
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Overview of course distribution across categories.
            </p>
          </div>

          <div className="space-y-4">
            {categories.slice(0, 5).map((category) => {
              const coursesCount = category.coursesCount ?? 0;

              const percentage =
                totalCourses > 0
                  ? Math.round((coursesCount / totalCourses) * 100)
                  : 0;

              return (
                <div key={category.id}>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="truncate text-sm font-medium text-slate-700">
                      {category.name}
                    </span>

                    <span className="shrink-0 text-sm text-muted-foreground">
                      {coursesCount} {coursesCount === 1 ? "course" : "courses"}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="rounded-2xl bg-[#283044] p-5 text-white shadow-sm sm:p-6">
          <div className="mb-6">
            <h3 className="font-semibold">System Health</h3>

            <p className="mt-1 text-sm text-white/60">
              Category organization overview.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-white/70">Total Categories</span>

              <span className="font-semibold">{totalCategories}</span>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-white/70">
                Categories With Courses
              </span>

              <span className="font-semibold">{activeCategories}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Empty Categories</span>

              <span className="font-semibold">{emptyCategories}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Create Dialog */}
      {showCreateDialog && (
        <CreateCategoryDialog
          onClose={() => setShowCreateDialog(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
};

export default CategoriesList;
