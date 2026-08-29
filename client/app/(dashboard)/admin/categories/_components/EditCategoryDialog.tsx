"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Category } from "@/services/categories/types";
import { categoryClientService } from "@/services/categories/category.client.service";

interface Props {
  category: Category;
  onClose: () => void;
  onUpdated: (category: Category) => void;
}

const EditCategoryDialog = ({ category, onClose, onUpdated }: Props) => {
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description ?? "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const setData = () => {
      setName(category.name);
      setDescription(category.description ?? "");
      setError("");
    };
    setData();
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await categoryClientService.update(category.id, {
        name: name.trim(),
        description: description.trim(),
      });
      console.log(response)
      onUpdated(response);
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to update category",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-700">
              Edit Category
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Update category information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Category description"
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryDialog;
