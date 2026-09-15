import {
  BadgeCheck,
  Clock3,
  FileImage,
  PlayCircle,
  Smartphone,
} from "lucide-react";

const EnrollCourseAsideSkeleton = () => {
  return (
    <aside className="order-first min-w-0 lg:order-0 lg:col-span-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
        {/* Course Preview */}
        <div className="relative aspect-video bg-slate-200">
          <div className="absolute inset-0 animate-pulse bg-slate-200" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-14 animate-pulse rounded-full bg-white/70" />
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {/* Price */}
          <div>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-200 sm:h-11" />

              <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="mt-2 flex items-center gap-2">
              <Clock3 className="size-4 text-slate-200" />
              <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
            </div>
          </div>

          {/* Enrollment CTA */}
          <div className="mt-6">
            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />

            <div className="mx-auto mt-3 h-3 w-4/5 animate-pulse rounded bg-slate-200" />
            <div className="mx-auto mt-2 h-3 w-3/5 animate-pulse rounded bg-slate-200" />
          </div>

          {/* Payment Process */}
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />

            <ol className="mt-3 space-y-3">
              {[1, 2, 3].map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="size-6 shrink-0 animate-pulse rounded-full bg-slate-200" />

                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Includes */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <div className="mb-4 h-5 w-28 animate-pulse rounded bg-slate-200" />

            <ul className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {[
                PlayCircle,
                FileImage,
                BadgeCheck,
                Smartphone,
              ].map((Icon, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-slate-200" />
                  <div
                    className={`h-4 animate-pulse rounded bg-slate-200 ${
                      index === 0
                        ? "w-32"
                        : index === 1
                          ? "w-28"
                          : index === 2
                            ? "w-36"
                            : "w-40"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EnrollCourseAsideSkeleton;