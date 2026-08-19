"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CommonQuestionProps {
  title: string;
  content: string;
}

export default function CommonQuestion({
  title,
  content,
}: CommonQuestionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
      >
        <h3 className="text-lg font-semibold text-gray-900 text-right">{title}</h3>

        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40" : "max-h-0"
        }`}
      >
        <p className="ml-2  px-6 pt-0.5 pb-6 text-gray-600 leading-7 text-start">- {content}</p>
      </div>
    </div>
  );
}
