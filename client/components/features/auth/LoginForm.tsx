"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { loginSchema, LoginSchema } from "./schemas/login.schema";
import { useLogin } from "./hooks/useLogin";
import FormError from "./FormError";
import { cn } from "@/lib/utils";

const LoginForm = () => {
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "حدث خطأ غير متوقع.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          البريد الإلكتروني
        </label>

        <input
          type="email"
          placeholder="example@email.com"
          {...register("email")}
          className={cn(
            "input",
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-100"
              : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100",
          )}
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
          placeholder="••••••••"
          {...register("password")}
          className={`h-14 w-full rounded-xl border px-5 outline-none transition ${
            errors.password
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          }`}
        />

        <FormError message={errors.password?.message} />
      </div>

      {/* Server Error */}
      <FormError message={errors.root?.message} />

      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          نسيت كلمة المرور؟
        </Link>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" />
          تذكرني
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ArrowLeft size={18} />

        {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </button>
    </form>
  );
};

export default LoginForm;
