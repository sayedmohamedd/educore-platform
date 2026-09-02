const PaymentRequestsSkeleton = () => {
  return (
    <div className="space-y-6 px-8 py-4">
      <div>
        <div className="h-8 w-52 animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-2 h-4 w-80 animate-pulse rounded bg-slate-100" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
                <div className="mt-3 h-8 w-12 animate-pulse rounded bg-slate-200" />
              </div>

              <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="h-10 w-full animate-pulse rounded-xl bg-slate-100 lg:max-w-md" />

            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-9 w-20 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="h-14 animate-pulse bg-slate-50" />

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse border-t border-slate-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentRequestsSkeleton;
