const TeacherBio = () => {
  return (
    <section className="rounded-[28px] border border-border/40 bg-white p-8 backdrop-blur-xl h-full">
      <h2 className="mt-2 mb-6 text-3xl font-bold">
        نبذة عن المدرب
      </h2>

      <div className="space-y-5 leading-8 text-muted-foreground">
        <p>
          أعمل كمطور Full Stack ومتخصص في React و Next.js و NestJS،
          وأسعى إلى تبسيط المفاهيم البرمجية وتحويلها إلى مشاريع عملية
          تحاكي بيئة العمل الحقيقية.
        </p>

        <p>
          هدفي هو مساعدة الطلاب على الانتقال من مرحلة التعلم إلى مرحلة
          الاحتراف من خلال بناء مشاريع حقيقية وفهم أفضل الممارسات
          المستخدمة داخل الشركات.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        {[
          "React",
          "Next.js",
          "NestJS",
          "TypeScript",
          "PostgreSQL",
          "Prisma",
          "Docker",
          "TailwindCSS",
        ].map((item) => (
          <span
            key={item}
            className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};

export default TeacherBio;