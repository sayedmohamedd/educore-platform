const TeachersListSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <article
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          {/* Avatar */}
          <div className="flex justify-center pt-6">
            <div className="h-24 w-24 animate-pulse rounded-full bg-slate-200" />
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mx-auto h-5 w-32 animate-pulse rounded bg-slate-200" />

            <div className="mx-auto mt-2 h-4 w-24 animate-pulse rounded bg-slate-200" />

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
              <div className="mx-auto h-3 w-4/5 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
              <div className="mx-auto h-3 w-3/4 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default TeachersListSkeleton;
