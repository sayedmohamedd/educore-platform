import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

const TeacherCard = () => {
  return (
    <section className="my-6 py-8 sm:py-12">
      <h3 className="heading-2 mb-6 sm:mb-8">المدرب</h3>

      <div className="flex flex-col items-start gap-6 sm:flex-row">
        {/* Avatar */}
        <img
          src="/mentors/sayed.jpeg"
          alt="Sayed Mohamed"
          className="size-20 shrink-0 rounded-full object-cover shadow-lg sm:size-24"
        />

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h4 className="text-2xl font-bold">سيد محمد</h4>

          <p className="mt-1 font-medium text-primary">
            مطور Full Stack | React • Next.js • NestJS
          </p>

          {/* Stats */}
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span>⭐ 4.9 تقييم المدرب</span>
            <span>👨‍🎓 +2,500 طالب</span>
            <span>📚 8 دورات</span>
            <span>💼 4 سنوات خبرة</span>
          </div>

          {/* Bio */}
          <p className="mt-6 max-w-4xl leading-8 text-muted-foreground">
            مطور ويب متخصص في بناء تطبيقات الويب الحديثة باستخدام React و
            Next.js و NestJS، مع خبرة في تطوير منصات SaaS وأنظمة إدارة التعلم.
            أؤمن أن أفضل طريقة لتعلم البرمجة هي بناء مشاريع حقيقية تحاكي بيئة
            العمل الفعلية.
          </p>

          {/* Links */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="#" className="font-medium text-primary hover:underline">
              الموقع الشخصي
            </Link>

            <Link href="#" className="font-medium text-primary hover:underline">
              GitHub
            </Link>

            <Link href="#" className="font-medium text-primary hover:underline">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherCard;
