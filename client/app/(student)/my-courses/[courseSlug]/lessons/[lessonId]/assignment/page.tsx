"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Upload,
  Clock3,
  Send,
} from "lucide-react";
import IconButton from "@/components/ui/IconButton";

const AssignmentPage = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) return;

    console.log("Submitting:", file.name);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="container max-w-5xl">
        {/* Back */}
        <button
          type="button"
          className="mb-5 flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to Course
        </button>

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="size-6 text-primary" />
            </div>

            <div>
              <p className="text-sm font-medium text-primary">Assignment</p>

              <h1 className="mt-1 text-2xl font-bold text-slate-700">
                Build a Scalable System Architecture
              </h1>

              <p className="mt-2 text-sm text-muted">
                Advanced Cloud Infrastructure & Design
              </p>
            </div>
          </div>
        </header>

        {/* Status */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100">
                <Clock3 className="size-5 text-orange-500" />
              </div>

              <div>
                <p className="text-xs text-muted">Due Date</p>
                <p className="mt-1 font-semibold text-slate-700">
                  September 5, 2026
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100">
                <CheckCircle2 className="size-5 text-slate-400" />
              </div>

              <div>
                <p className="text-xs text-muted">Submission Status</p>
                <p className="mt-1 font-semibold text-slate-700">
                  Not Submitted
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Assignment Description */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-700">
              Assignment Instructions
            </h2>

            <p className="mt-1 text-sm text-muted">
              Read the instructions carefully before submitting your work.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-600">
              Design a scalable distributed system architecture for a
              high-traffic web application. Your solution should demonstrate how
              the system handles scalability, fault tolerance, data consistency,
              and high availability.
            </p>

            <h3 className="mt-5 font-semibold text-slate-700">Requirements</h3>

            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              <li>• Design the overall system architecture.</li>
              <li>• Explain your database and caching strategy.</li>
              <li>• Explain how your system handles failures.</li>
              <li>• Explain how the system can scale horizontally.</li>
              <li>• Include a diagram of your proposed architecture.</li>
            </ul>
          </div>
        </section>

        {/* Submission */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-700">
              Submit Your Assignment
            </h2>

            <p className="mt-1 text-sm text-muted">
              Upload your completed assignment as a PDF or document.
            </p>
          </div>

          <label
            htmlFor="assignment-file"
            className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-10 text-center transition hover:border-primary/40 hover:bg-primary/5"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
              <Upload className="size-5 text-primary" />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-700">
              {file ? file.name : "Click to upload your assignment"}
            </p>

            <p className="mt-1 text-xs text-muted">PDF, DOC, DOCX up to 10MB</p>

            <input
              id="assignment-file"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="size-5 shrink-0 text-primary" />

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-xs font-medium text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <IconButton
              Icon={Send}
              text="Submit Assignment"
              onClick={handleSubmit}
              disabled={!file}
              className="bg-primary px-5 py-2.5 text-white disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </section>

        {/* Previous Submission */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100">
              <CheckCircle2 className="size-5 text-slate-400" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-700">
                No Previous Submission
              </h3>

              <p className="mt-1 text-sm leading-6 text-muted">
                You haven&apos;t submitted this assignment yet. Upload your work
                above to complete this task.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AssignmentPage;
