import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

const TeacherCard = () => {
  return (
    <section className="py-12 my-6">
      <h3 className="heading-2 mb-8">المدرب</h3>

      <div className="flex items-start gap-6">
        {/* Avatar */}
        <img
          src="/mentors/sayed.jpeg"
          alt="Sayed Mohamed"
          className="size-24 rounded-full object-cover shadow-lg"
        />

        {/* Content */}
        <div className="flex-1">
          <h4 className="text-2xl font-bold">سيد محمد</h4>

          <p className="mt-1 text-primary font-medium">
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
          <div className="mt-6 flex items-center gap-6">
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
