"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import FormError from "./FormError";
import { signupSchema, SignupSchema } from "./schemas/signup.schema";
import { useSignup } from "./hooks/useSignup";

const SignupForm = () => {
  const { signup } = useSignup();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      await signup(data);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "حدث خطأ غير متوقع.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          الاسم الكامل
        </label>

        <input
          type="text"
          placeholder="محمد أحمد"
          {...register("fullName")}
          className={`h-14 w-full rounded-xl border px-5 outline-none transition ${
            errors.fullName
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          }`}
        />

        <FormError message={errors.fullName?.message} />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          البريد الإلكتروني
        </label>

        <input
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          className={`h-14 w-full rounded-xl border px-5 outline-none transition ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          }`}
        />

        <FormError message={errors.email?.message} />
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          كلمة المرور
        </label>

        <input
          type="password"
          placeholder="********"
          {...register("password")}
          className={`h-14 w-full rounded-xl border px-5 outline-none transition ${
            errors.password
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          }`}
        />

        <FormError message={errors.password?.message} />
      </div>

      {/* Confirm Password */}
      {/* <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          تأكيد كلمة المرور
        </label>

        <input
          type="password"
          placeholder="********"
          {...register("confirmPassword")}
          className={`h-14 w-full rounded-xl border px-5 outline-none transition ${
            errors.confirmPassword
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          }`}
        />

        <FormError message={errors.confirmPassword?.message} />
      </div> */}

      {/* Server Error */}
      <FormError message={errors.root?.message} />

      {/* Terms */}
      <label className="flex items-start gap-3 text-sm text-gray-600">
        <input type="checkbox" className="mt-1" />

        <span>
          أوافق على{" "}
          <Link
            href="/terms"
            className="font-semibold text-indigo-600 hover:underline"
          >
            الشروط والأحكام
          </Link>{" "}
          و{" "}
          <Link
            href="/privacy"
            className="font-semibold text-indigo-600 hover:underline"
          >
            سياسة الخصوصية
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ArrowLeft size={18} />

        {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
      </button>
    </form>
  );
};

export default SignupForm;
