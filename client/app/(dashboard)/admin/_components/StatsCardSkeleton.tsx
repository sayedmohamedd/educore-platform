const StatsCardSkeleton = () => {
  return (
    <>
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
    </>
  );
};

export default StatsCardSkeleton;
