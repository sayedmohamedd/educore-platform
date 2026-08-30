const CourseProgress = () => {
  const progress = 68;
  return (
    <div className="flex items-center gap-3">
      <div className="hidden flex-col items-end gap-1 sm:flex">
        <span className="text-xs font-medium text-muted">Course Progress</span>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <span className="text-sm font-semibold text-primary">{progress}%</span>
    </div>
  );
};
export default CourseProgress;
