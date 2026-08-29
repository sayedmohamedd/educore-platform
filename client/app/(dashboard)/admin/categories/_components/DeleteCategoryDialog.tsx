"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import type { Category } from "@/services/categories/types";
import { categoryClientService } from "@/services/categories/category.client.service";

interface Props {
  category: Category;
  onClose: () => void;
  onDeleted: (categoryId: string) => void;
}

const DeleteCategoryDialog = ({
  category,
  onClose,
  onDeleted,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError("");

      await categoryClientService.delete(category.id);

      onDeleted(category.id);
      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete category",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <AlertTriangle className="size-5 text-red-500" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-700">
                Delete Category
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete
            <span className="font-semibold text-slate-800">
              {" "}
              {category.name}
            </span>
            ?
          </p>
        </div>

        {category.coursesCount > 0 && (
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
            This category contains {category.coursesCount}{" "}
            {category.coursesCount === 1 ? "course" : "courses"}.
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryDialog;