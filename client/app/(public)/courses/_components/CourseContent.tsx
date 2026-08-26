import { ChevronDown, PlayCircle } from "lucide-react";

const CourseContent = () => {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="heading-3">محتوى الدورة</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          8 أقسام • 42 محاضرة • 24 ساعة و 30 دقيقة
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        {/* Section 1 */}
        <details open className="group border-b last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition hover:bg-muted/30 sm:px-6">
            <div className="min-w-0">
              <h3 className="font-semibold">
                القسم الأول: مقدمة في React و Next.js
              </h3>

              <p className="mt-1.5 text-sm text-muted-foreground">
                5 محاضرات • 2 ساعة و 15 دقيقة
              </p>
            </div>

            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
          </summary>

          <div className="border-t bg-muted/20">
            <Lesson title="مقدمة عن React ولماذا نستخدمه؟" duration="18:32" />
            <Lesson title="فهم Components و Props" duration="24:15" />
            <Lesson title="التعامل مع State و Events" duration="31:40" />
            <Lesson title="بناء أول تطبيق React" duration="35:20" />
            <Lesson title="تجهيز المشروع باستخدام Next.js" duration="25:13" />
          </div>
        </details>

        {/* Section 2 */}
        <details className="group border-b last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition hover:bg-muted/30 sm:px-6">
            <div className="min-w-0">
              <h3 className="font-semibold">القسم الثاني: أساسيات Next.js</h3>

              <p className="mt-1.5 text-sm text-muted-foreground">
                6 محاضرات • 3 ساعات و 10 دقائق
              </p>
            </div>

            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
          </summary>

          <div className="border-t bg-muted/20">
            <Lesson title="مقدمة في App Router" duration="28:40" />

            <Lesson
              title="Server Components و Client Components"
              duration="41:20"
            />

            <Lesson title="Data Fetching في Next.js" duration="32:15" />
          </div>
        </details>

        {/* Section 3 */}
        <details className="group border-b last:border-b-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition hover:bg-muted/30 sm:px-6">
            <div className="min-w-0">
              <h3 className="font-semibold">القسم الثالث: بناء مشروع عملي</h3>

              <p className="mt-1.5 text-sm text-muted-foreground">
                7 محاضرات • 4 ساعات و 20 دقيقة
              </p>
            </div>

            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
          </summary>

          <div className="border-t bg-muted/20">
            <Lesson title="إعداد المشروع" duration="35:10" />
            <Lesson title="بناء واجهة المستخدم" duration="48:25" />
          </div>
        </details>
      </div>
    </section>
  );
};

const Lesson = ({ title, duration }: { title: string; duration: string }) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b px-5 py-4 last:border-b-0 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <PlayCircle className="h-5 w-5 shrink-0 text-primary" />

        <span className="truncate text-sm">{title}</span>
      </div>

      <span className="shrink-0 text-sm text-muted-foreground">{duration}</span>
    </div>
  );
};

export default CourseContent;
