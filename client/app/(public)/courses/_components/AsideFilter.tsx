const AsideFilter = () => {
  return (
    <aside className="h-fit w-full md:w-fit  rounded-2xl border border-border bg-white p-6 shadow-sm">
      {/* Level */}
      <div className="border-b border-border pb-6">
        <h3 className="mb-4 text-lg font-semibold">المستوى</h3>

        <ul className="space-y-3">
          {["سهل", "متوسط", "صعب"].map((level) => (
            <li key={level}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted">{level}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="border-b border-border py-6">
        <h3 className="mb-4 text-lg font-semibold">السعر</h3>

        <input
          type="range"
          min={0}
          max={500}
          className="w-full accent-primary"
        />

        <div className="mt-3 flex justify-between text-sm text-muted">
          <span>مجاني</span>
          <span>500 ج.م</span>
        </div>
      </div>

      {/* Duration */}
      <div className="py-6">
        <h3 className="mb-4 text-lg font-semibold">المدة</h3>

        <ul className="space-y-3">
          {["0 - 2 ساعة", "3 - 6 ساعات", "6+ ساعات"].map((duration) => (
            <li key={duration}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted">{duration}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <button className="mt-2 w-full rounded-xl border border-border py-3 text-sm font-medium transition hover:bg-surface">
        إعادة تعيين
      </button>
    </aside>
  );
};

export default AsideFilter;
