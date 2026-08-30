import {
  ChevronDown,
  Clock3,
  PlayCircle,
  FileQuestion,
  ClipboardCheck,
} from "lucide-react";

type LessonType = "video" | "quiz" | "assignment";

type LessonProps = {
  title: string;
  duration?: string;
  type?: LessonType;
};

type Section = {
  id: number;
  title: string;
  lessonsCount: number;
  duration: string;
  lessons: LessonProps[];
};

const sections: Section[] = [
  {
    id: 1,
    title: "القسم الأول: مقدمة في React و Next.js",
    lessonsCount: 5,
    duration: "2 ساعة و 15 دقيقة",
    lessons: [
      {
        title: "مقدمة عن React ولماذا نستخدمه؟",
        duration: "18:32",
        type: "video",
      },
      {
        title: "فهم Components و Props",
        duration: "24:15",
        type: "video",
      },
      {
        title: "التعامل مع State و Events",
        duration: "31:40",
        type: "video",
      },
      {
        title: "اختبار أساسيات React",
        duration: "10 أسئلة",
        type: "quiz",
      },
      {
        title: "بناء أول تطبيق React",
        duration: "35:20",
        type: "video",
      },
    ],
  },
  {
    id: 2,
    title: "القسم الثاني: أساسيات Next.js",
    lessonsCount: 6,
    duration: "3 ساعات و 10 دقائق",
    lessons: [
      {
        title: "مقدمة في App Router",
        duration: "28:40",
        type: "video",
      },
      {
        title: "Server Components و Client Components",
        duration: "41:20",
        type: "video",
      },
      {
        title: "Data Fetching في Next.js",
        duration: "32:15",
        type: "video",
      },
      {
        title: "تطبيق عملي على App Router",
        duration: "35:10",
        type: "video",
      },
      {
        title: "اختبار Next.js",
        duration: "15 سؤال",
        type: "quiz",
      },
      {
        title: "Assignment: بناء صفحة باستخدام Next.js",
        duration: "مهمة عملية",
        type: "assignment",
      },
    ],
  },
  {
    id: 3,
    title: "القسم الثالث: بناء مشروع عملي",
    lessonsCount: 7,
    duration: "4 ساعات و 20 دقيقة",
    lessons: [
      {
        title: "إعداد المشروع",
        duration: "35:10",
        type: "video",
      },
      {
        title: "بناء واجهة المستخدم",
        duration: "48:25",
        type: "video",
      },
      {
        title: "إدارة الحالة والبيانات",
        duration: "42:15",
        type: "video",
      },
      {
        title: "ربط المشروع بالـ API",
        duration: "36:40",
        type: "video",
      },
    ],
  },
];

const CourseContent = () => {
  const totalLessons = sections.reduce(
    (total, section) => total + section.lessonsCount,
    0,
  );

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-5">
        <h2 className="heading-3">محتوى الدورة</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {sections.length} أقسام • {totalLessons} محاضرة • 24 ساعة و 30 دقيقة
        </p>
      </div>

      {/* Sections */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-card shadow-sm">
        {sections.map((section, index) => (
          <details
            key={section.id}
            open={index === 0}
            className="group border-b border-slate-200 last:border-b-0"
          >
            {/* Section Header */}
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-muted/30 sm:px-6">
              <div className="min-w-0">
                <h3 className="font-semibold text-slate-700">
                  {section.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>{section.lessonsCount} محاضرات</span>

                  <span className="h-1 w-1 rounded-full bg-slate-300" />

                  <span className="flex items-center gap-1.5">
                    <Clock3 className="size-3.5" />
                    {section.duration}
                  </span>
                </div>
              </div>

              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </div>
            </summary>

            {/* Lessons */}
            <div className="border-t border-slate-100 bg-muted/20 p-2 sm:p-3">
              {section.lessons.map((lesson) => (
                <Lesson
                  key={lesson.title}
                  title={lesson.title}
                  duration={lesson.duration}
                  type={lesson.type}
                />
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
};

const Lesson = ({ title, duration, type = "video" }: LessonProps) => {
  const getIcon = () => {
    if (type === "quiz") {
      return (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
          <FileQuestion className="size-5" />
        </div>
      );
    }

    if (type === "assignment") {
      return (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
          <ClipboardCheck className="size-5" />
        </div>
      );
    }

    return (
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <PlayCircle className="size-5" />
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        {getIcon()}

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-700">{title}</p>

          <span className="mt-1 block text-xs text-muted-foreground">
            {type === "video" && "فيديو"}
            {type === "quiz" && "اختبار"}
            {type === "assignment" && "مهمة عملية"}
          </span>
        </div>
      </div>

      <span className="shrink-0 text-xs text-muted-foreground sm:text-sm">
        {duration}
      </span>
    </div>
  );
};

export default CourseContent;
