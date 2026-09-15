const StatsSkeleton = () => {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              {/* Title */}
              <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

              {/* Number */}
              <div className="h-8 w-20 animate-pulse rounded bg-slate-200" />
            </div>

            {/* Icon */}
            <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
