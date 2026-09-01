/* eslint-disable @next/next/no-img-element */

"use client";

import { Course } from "@/services/courses/types";
import {
  BadgeCheck,
  Clock3,
  FileImage,
  PlayCircle,
  Smartphone,
  Upload,
} from "lucide-react";
import Link from "next/link";

const EnrollCourseAside = ({ course }: { course: Course }) => {
  return (
    <aside className="order-first min-w-0 lg:order-0 lg:col-span-3">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-24">
        {/* Course Preview */}
        <div className="relative aspect-video bg-slate-100">
          <img
          loading="lazy"
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
            alt="Course Preview"
            className="h-full w-full object-cover"
          />

          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
              <PlayCircle className="size-8 text-primary" />
            </div>
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {/* Price */}
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              الأكثر مبيعًا
            </span>

            <div className="mt-3 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-bold text-slate-800 sm:text-4xl">
                EG {course?.price}
              </span>

              <span className="text-base text-muted-foreground line-through">
                EG {course?.price + 200}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
              <Clock3 className="size-4" />
              <span>العرض ينتهي خلال 12 ساعة</span>
            </div>
          </div>

          {/* Enrollment CTA */}
          <div className="mt-6">
            <Link
              href={`/courses/${course?.slug}/enroll`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition hover:opacity-90"
            >
              <Upload className="size-5" />
              طلب التسجيل في الدورة
            </Link>

            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
              بعد الدفع، أرسل بيانات التحويل وصورة الإيصال لمراجعة طلبك.
            </p>
          </div>

          {/* Payment Process */}
          <div className="mt-6 rounded-xl border border-primary/10 bg-primary/5 p-4">
            <h4 className="font-semibold text-slate-700">طريقة التسجيل</h4>

            <ol className="mt-3 space-y-3">
              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  1
                </span>

                <p className="text-sm leading-6 text-muted-foreground">
                  حوّل قيمة الدورة إلى حساب المنصة.
                </p>
              </li>

              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  2
                </span>

                <p className="text-sm leading-6 text-muted-foreground">
                  أدخل بيانات التحويل وارفع صورة الإيصال.
                </p>
              </li>

              <li className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  3
                </span>

                <p className="text-sm leading-6 text-muted-foreground">
                  انتظر مراجعة الإدارة وتأكيد التسجيل.
                </p>
              </li>
            </ol>
          </div>

          {/* Includes */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="mb-4 font-semibold text-slate-700">الدورة تشمل:</h4>

            <ul className="grid grid-cols-1 gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-1">
              <li className="flex items-center gap-3">
                <PlayCircle className="size-5 shrink-0 text-primary" />
                <span>{course?.duration} ساعة فيديو</span>
              </li>

              <li className="flex items-center gap-3">
                <FileImage className="size-5 shrink-0 text-primary" />
                <span>15 ملفًا وموارد</span>
              </li>

              <li className="flex items-center gap-3">
                <BadgeCheck className="size-5 shrink-0 text-primary" />
                <span>وصول كامل للدورة</span>
              </li>

              <li className="flex items-center gap-3">
                <Smartphone className="size-5 shrink-0 text-primary" />
                <span>الوصول من الهاتف والكمبيوتر</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EnrollCourseAside;
