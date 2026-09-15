const CourseCardSkeleton = () => {
  return (
    <article className="h-fit overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* Image */}
      <div className="h-44 w-full animate-pulse bg-slate-200" />

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="size-4 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-7 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className="size-8 animate-pulse rounded-full bg-slate-200" />

          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-2">
            <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="flex items-center gap-1">
            <div className="size-4 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          </div>
        </div>

        {/* Action */}
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
      </div>
    </article>
  );
};

export default CourseCardSkeleton;
