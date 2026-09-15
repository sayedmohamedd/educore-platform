"use client";

import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  Star,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { Role, useAuthStore } from "@/store/auth.store";

const services = [
  {
    icon: BookOpen,
    title: "دورات تعليمية متنوعة",
    description:
      "اكتشف مجموعة متنوعة من الدورات التعليمية في مجالات مختلفة، واختر المحتوى المناسب لأهدافك ومستواك.",
  },
  {
    icon: GraduationCap,
    title: "التعلم من معلمين متخصصين",
    description:
      "تعلم من معلمين وخبراء يقدّمون محتوى تعليميًا منظمًا يساعدك على تطوير مهاراتك وفهم المفاهيم بشكل أفضل.",
  },
  {
    icon: Users,
    title: "كن معلّمًا على EduCore",
    description:
      "شارك خبرتك ومعرفتك مع الطلاب من خلال إنشاء دوراتك الخاصة وإدارة المحتوى والطلاب من مكان واحد.",
  },
  {
    icon: BarChart3,
    title: "متابعة تقدمك",
    description:
      "تابع تقدمك في الدورات التي التحقت بها واعرف ما أنجزته وما تبقى لك للوصول إلى أهدافك التعليمية.",
  },
  {
    icon: Star,
    title: "التقييمات والمراجعات",
    description:
      "اطلع على تقييمات الطلاب ومراجعاتهم للدورات قبل اختيار ما يناسبك، وساعد الآخرين بتقييم تجربتك التعليمية.",
  },
  {
    icon: ShieldCheck,
    title: "تجربة تعليمية موثوقة",
    description:
      "منصة تجمع الطلاب والمعلمين في بيئة تعليمية منظمة مع إدارة واضحة للدورات والمحتوى والتعاملات.",
  },
];

const ServicesPage = () => {
  const { user } = useAuthStore();
  return (
    <main className="min-h-screen bg-slate-50" dir="rtl">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              خدمات EduCore
            </span>

            <h1 className="text-3xl font-bold leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
              كل ما تحتاجه لتجربة{" "}
              <span className="text-primary">تعليمية أفضل</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              EduCore تربط بين الطلاب والمعلمين في منصة تعليمية واحدة، تساعدك
              على التعلم، مشاركة المعرفة، ومتابعة رحلتك التعليمية بسهولة.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            ماذا تقدم EduCore؟
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            أدوات وخدمات مصممة لتجعل عملية التعلم والتعليم أكثر تنظيمًا وفاعلية.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="rounded-2xl bg-primary px-6 py-10 text-center text-white sm:px-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            ابدأ رحلتك التعليمية اليوم
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
            استكشف الدورات المتاحة وابدأ في تطوير مهاراتك مع معلمين متخصصين، أو
            شارك خبرتك وابدأ رحلتك كمعلم على EduCore.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-slate-100"
            >
              استكشف الدورات
              <ArrowLeft size={17} />
            </Link>

            {user?.role !== Role.TEACHER && (
              <Link
                href="/teacher/apply"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                كن معلّمًا
                <GraduationCap size={17} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
