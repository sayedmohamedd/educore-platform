import EnrollCourseAside from "@/app/(public)/courses/_components/EnrollCourseAside";
import TeacherCard from "@/app/(public)/courses/_components/TeacherCard";
import CourseCard from "@/components/shared/cards/CourseCard";
import { courses } from "@/lib/data";
import { CircleCheck, ChevronLeft, Star } from "lucide-react";
import Link from "next/link";

const CoursePage = () => {
  return (
    <div className="container grid grid-cols-12 gap-8 py-12">
      <main className="col-span-9">
        {/* Breadcrumb */}
        <ul className="my-2 flex items-center gap-2 text-sm text-muted">
          <li>الرئيسية</li>
          <ChevronLeft size={16} />
          <li>البرمجة</li>
          <ChevronLeft size={16} />
          <li className="text-foreground">
            تطوير واجهات المستخدم باستخدام React
          </li>
        </ul>

        {/* Course Header */}
        <section className="space-y-4">
          <h1 className="page-title">
            تطوير واجهات المستخدم الاحترافية باستخدام React و Next.js
          </h1>

          <p className="paragraph">
            تعلم بناء تطبيقات ويب حديثة باستخدام React و Next.js بدايةً من
            الأساسيات وحتى إنشاء مشاريع احترافية قابلة للنشر في سوق العمل.
          </p>

          <ul className="flex flex-wrap items-center gap-6 text-sm">
            <li className="flex items-center gap-2">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              <span className="font-medium">4.9</span>
              <span className="text-muted">(125 تقييم)</span>
            </li>

            <li>
              بواسطة <span className="text-primary font-medium">أحمد محمد</span>
            </li>

            <li>👨‍🎓 +15,553 طالب</li>

            <li>آخر تحديث: يناير 2026</li>
          </ul>
        </section>

        {/* Intro Video */}
        <section className="mt-10">
          <div className="aspect-video overflow-hidden rounded-2xl bg-muted">
            {/* Video Here */}
          </div>
        </section>

        {/* About */}
        <section className="mt-10 space-y-5">
          <h2 className="heading-3">نبذة عن الدورة</h2>

          <p className="paragraph">
            في هذه الدورة ستتعلم كيفية بناء واجهات مستخدم احترافية باستخدام
            React و Next.js مع أفضل الممارسات في تنظيم المشاريع، إدارة الحالة،
            وتحسين الأداء، بالإضافة إلى تنفيذ مشاريع عملية تحاكي بيئة العمل
            الحقيقية.
          </p>
        </section>

        {/* Learning Outcomes */}
        <section className="mt-10">
          <h2 className="heading-3 mb-5">ماذا ستتعلم؟</h2>

          <ul className="grid grid-cols-2 gap-5">
            <li className="flex gap-3">
              <CircleCheck className="mt-1 text-primary" />
              <p className="text-muted">
                إنشاء تطبيقات احترافية باستخدام React و Next.js.
              </p>
            </li>

            <li className="flex gap-3">
              <CircleCheck className="mt-1 text-primary" />
              <p className="text-muted">
                تنظيم المشاريع بطريقة قابلة للتوسع والصيانة.
              </p>
            </li>

            <li className="flex gap-3">
              <CircleCheck className="mt-1 text-primary" />
              <p className="text-muted">
                التعامل مع REST APIs وإدارة البيانات.
              </p>
            </li>

            <li className="flex gap-3">
              <CircleCheck className="mt-1 text-primary" />
              <p className="text-muted">
                نشر التطبيقات على Vercel وتجهيزها للإنتاج.
              </p>
            </li>

            <li className="flex gap-3">
              <CircleCheck className="mt-1 text-primary" />
              <p className="text-muted">
                استخدام Tailwind CSS لبناء واجهات حديثة.
              </p>
            </li>

            <li className="flex gap-3">
              <CircleCheck className="mt-1 text-primary" />
              <p className="text-muted">
                تنفيذ مشروع كامل لإضافته إلى معرض أعمالك.
              </p>
            </li>
          </ul>
        </section>

        {/* Course Content */}
        <section className="mt-10">
          <h2 className="heading-3">محتوى الدورة</h2>

          <div className="mt-4 rounded-xl border p-6">
            سيتم عرض أقسام ومحاضرات الدورة هنا.
          </div>
        </section>

        {/* Instructor */}
        <TeacherCard />

        {/* Related Courses */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="heading-3">دورات قد تعجبك</h2>

            <Link href="" className="text-primary hover:underline">
              عرض جميع الدورات
            </Link>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <CourseCard {...courses[0]} />
          </section>
        </section>
      </main>

      <EnrollCourseAside />
    </div>
  );
};

export default CoursePage;
