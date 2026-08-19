import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import SignupForm from "@/components/features/auth/SignupForm";

export default function SignupPage() {
  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-cyan-500"
    >
      {/* Background Glow */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-120 w-120 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-violet-300/10 blur-3xl" />

      <div className="container relative flex min-h-screen items-center py-10">
        <div className="grid w-full overflow-hidden rounded-4xl border border-white/15 bg-white/10 backdrop-blur-xl lg:grid-cols-2">
          {/* Right Side */}
          <div className="flex flex-col justify-between p-10 text-white lg:p-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
                <Rocket size={18} />
                ابدأ رحلتك التعليمية
              </div>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight">
                مستقبلك يبدأ
                <br />
                بخطوة
                <br />
                <span className="text-cyan-300">واحدة.</span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-white/80">
                أنشئ حسابك مجانًا، واستمتع بمئات الدورات الاحترافية، وتعلم من
                أفضل المدربين، وابنِ مستقبلك بثقة.
              </p>

              <div className="mt-12 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 p-3">
                    <Users />
                  </div>

                  <div>
                    <h3 className="font-semibold">أكثر من 15,000 طالب</h3>

                    <p className="text-sm text-white/70">
                      انضموا بالفعل إلى مجتمع EDUCore.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 p-3">
                    <GraduationCap />
                  </div>

                  <div>
                    <h3 className="font-semibold">أكثر من 120 دورة</h3>

                    <p className="text-sm text-white/70">
                      في البرمجة، التصميم، الذكاء الاصطناعي، والأعمال.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 p-3">
                    <ShieldCheck />
                  </div>

                  <div>
                    <h3 className="font-semibold">تعلم بثقة</h3>

                    <p className="text-sm text-white/70">
                      منصة آمنة وتجربة تعليمية احترافية.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-10 text-sm text-white/60">
              © 2026 EDUCore. جميع الحقوق محفوظة.
            </p>
          </div>

          {/* Left Side */}
          <div className="bg-white p-8 lg:p-16">
            <div className="mx-auto max-w-md">
              <h2 className="text-4xl font-bold text-gray-900">إنشاء حساب</h2>

              <p className="mt-3 text-gray-500">
                أنشئ حسابك وابدأ رحلتك التعليمية في دقائق.
              </p>

              <SignupForm />

              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gray-400">أو</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button className="rounded-xl border border-gray-200 py-3 font-medium transition hover:bg-gray-50">
                  Google
                </button>

                <button className="rounded-xl border border-gray-200 py-3 font-medium transition hover:bg-gray-50">
                  GitHub
                </button>
              </div>

              <p className="mt-10 text-center text-gray-500">
                لديك حساب بالفعل؟{" "}
                <Link
                  href="/login"
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
