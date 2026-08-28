"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { CreateSectionInput } from "./types";

interface AddSectionFormProps {
  nextOrder: number;
  isLoading: boolean;

  onSubmit: (data: CreateSectionInput) => void;
  onCancel: () => void;
}

const AddSectionForm = ({
  nextOrder,
  isLoading,
  onSubmit,
  onCancel,
}: AddSectionFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      order: nextOrder,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          placeholder="e.g. Introduction to NestJS"
          className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:bg-slate-50"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="flex-1 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddSectionForm;
