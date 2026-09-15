"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/features/auth/FormError";
import {
  teacherApplicationSchema,
  TeacherApplicationSchema,
} from "./teacherApplication.schema";

const TeacherApplicationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeacherApplicationSchema>({
    resolver: zodResolver(teacherApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      title: "",
      expertise: "",
      phone: "",
      bio: "",
    },
  });

  const onSubmit = async (data: TeacherApplicationSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Account Information */}
      <div>
        <h3 className="text-base font-semibold text-slate-800">
          بيانات الحساب
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          إذا لم يكن لديك حساب بالفعل، استخدم بياناتك لإنشاء حساب جديد.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            الاسم بالكامل
          </label>

          <input
            type="text"
            placeholder="أحمد محمد"
            {...register("fullName")}
            className={`input ${
              errors.fullName ? "border-red-500 focus:border-red-500" : ""
            }`}
          />

          <FormError message={errors.fullName?.message} />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            البريد الإلكتروني
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            className={`input ${
              errors.email ? "border-red-500 focus:border-red-500" : ""
            }`}
          />

          <FormError message={errors.email?.message} />
        </div>

        {/* Password */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            كلمة المرور
          </label>

          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={`input ${
              errors.password ? "border-red-500 focus:border-red-500" : ""
            }`}
          />

          <FormError message={errors.password?.message} />
        </div>
      </div>

      {/* Teacher Information */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-base font-semibold text-slate-800">
          بيانات المعلم
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          أخبرنا عن خبرتك والمجال الذي تريد التدريس فيه.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            المسمى المهني
          </label>

          <input
            type="text"
            placeholder="مدرس رياضيات"
            {...register("title")}
            className={`input ${
              errors.title ? "border-red-500 focus:border-red-500" : ""
            }`}
          />

          <FormError message={errors.title?.message} />
        </div>

        {/* Expertise */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            مجال التخصص
          </label>

          <input
            type="text"
            placeholder="الرياضيات والفيزياء"
            {...register("expertise")}
            className={`input ${
              errors.expertise ? "border-red-500 focus:border-red-500" : ""
            }`}
          />

          <FormError message={errors.expertise?.message} />
        </div>

        {/* Phone */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            رقم الهاتف
          </label>

          <input
            type="tel"
            placeholder="01xxxxxxxxx"
            {...register("phone")}
            className={`input ${
              errors.phone ? "border-red-500 focus:border-red-500" : ""
            }`}
          />

          <FormError message={errors.phone?.message} />
        </div>

        {/* Bio */}
        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            نبذة عنك
          </label>

          <textarea
            rows={5}
            placeholder="اكتب نبذة مختصرة عن خبرتك ومجال تخصصك..."
            {...register("bio")}
            className={`min-h-32 w-full resize-none rounded-xl border border-gray-200 px-5 py-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 ${
              errors.bio ? "border-red-500 focus:border-red-500" : ""
            }`}
          />

          <FormError message={errors.bio?.message} />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-14 w-full items-center justify-center rounded-xl bg-primary font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "جاري إرسال الطلب..." : "إرسال طلب التقديم"}
      </button>
    </form>
  );
};

export default TeacherApplicationForm;
