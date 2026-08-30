/* eslint-disable @next/next/no-img-element */

import { BookOpen, GraduationCap, Star, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

const TeacherCard = () => {
  return (
    <section className="mt-10 border-t border-slate-200 pt-10 sm:mt-12 sm:pt-12">
      <div className="mb-6 sm:mb-8">
        <h3 className="heading-2">المدرب</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          تعرف على المدرب وخبرته في المجال.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <img
            src="/mentors/sayed.jpeg"
            alt="Sayed Mohamed"
            className="size-20 shrink-0 rounded-full object-cover shadow-sm sm:size-24"
          />

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h4 className="text-xl font-bold text-slate-800 sm:text-2xl">
              سيد محمد
            </h4>

            <p className="mt-1 font-medium text-primary">
              مطور Full Stack | React • Next.js • NestJS
            </p>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="size-4 shrink-0 text-yellow-500" />
                <span>4.9 تقييم المدرب</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <GraduationCap className="size-4 shrink-0 text-primary" />
                <span>+2,500 طالب</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="size-4 shrink-0 text-primary" />
                <span>8 دورات</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BriefcaseBusiness className="size-4 shrink-0 text-primary" />
                <span>4 سنوات خبرة</span>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-6 max-w-4xl text-sm leading-8 text-muted-foreground sm:text-base">
              مطور ويب متخصص في بناء تطبيقات الويب الحديثة باستخدام React و
              Next.js و NestJS، مع خبرة في تطوير منصات SaaS وأنظمة إدارة التعلم.
              أؤمن أن أفضل طريقة لتعلم البرمجة هي بناء مشاريع حقيقية تحاكي بيئة
              العمل الفعلية.
            </p>

            {/* Links */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-5">
              <Link
                href="#"
                className="text-sm font-medium text-primary transition hover:underline"
              >
                الموقع الشخصي
              </Link>

              <Link
                href="#"
                className="text-sm font-medium text-primary transition hover:underline"
              >
                GitHub
              </Link>

              <Link
                href="#"
                className="text-sm font-medium text-primary transition hover:underline"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherCard;
