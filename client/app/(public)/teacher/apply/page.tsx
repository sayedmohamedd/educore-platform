import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Users,
} from "lucide-react";
import TeacherApplicationForm from "../_components/TeacherApplicationForm";

const TeacherApplyPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <GraduationCap size={28} />
            </div>

            <span className="text-sm font-medium text-primary">
              انضم إلى مجتمع المعلمين
            </span>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-800 sm:text-4xl">
              شارك خبرتك وابدأ رحلتك كمعلم على EduCore
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              قدّم طلبك للانضمام إلى المعلمين على EduCore، وبعد مراجعة بياناتك
              والموافقة على طلبك يمكنك إنشاء دوراتك ومشاركة معرفتك مع الطلاب.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-800">
                طلب الانضمام كمعلم
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                أدخل بياناتك ومعلومات تخصصك ليتمكن فريق الإدارة من مراجعة طلبك.
              </p>
            </div>

            <TeacherApplicationForm />
          </div>

          {/* Benefits */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">
              لماذا EduCore؟
            </h2>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen size={20} />
                </div>

                <div>
                  <h3 className="font-medium text-slate-800">
                    أنشئ دوراتك الخاصة
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    أنشئ محتوى تعليميًا منظمًا وشارك خبرتك مع الطلاب.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users size={20} />
                </div>

                <div>
                  <h3 className="font-medium text-slate-800">وصل إلى الطلاب</h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    ساعد الطلاب على تطوير مهاراتهم من خلال خبرتك ومحتواك.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <h3 className="font-medium text-slate-800">
                    مراجعة قبل النشر
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    يتم مراجعة طلبك قبل تفعيل حسابك كمعلم على المنصة.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-sm leading-6 text-muted-foreground">
                لديك حساب بالفعل؟
              </p>

              <Link
                href="/login"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                تسجيل الدخول
                <ArrowLeft size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default TeacherApplyPage;
