import { BookOpen } from "lucide-react";
import Link from "next/link";

const EmptyCoursesState = () => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <BookOpen className="size-5" />
      </div>

      <h4 className="font-semibold text-slate-700">لسه مفيش كورسات</h4>

      <p className="mt-1 text-sm text-muted-foreground">
        أنت مش مشترك في أي كورسات.
      </p>

      <Link
        href="/courses"
        className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary"
      >
        تصفح الكورسات
      </Link>
    </div>
  );
};

export default EmptyCoursesState;
