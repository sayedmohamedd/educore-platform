import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Globe, User, X } from "lucide-react";

const TeacherHero = () => {
  return (
    <section className="flex flex-col items-center gap-10 lg:flex-row bg-white p-12 rounded-2xl shadow">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

        <div className="relative overflow-hidden rounded-full border-4 border-background shadow-2xl">
          <Image
            src="/mentors/sayed.jpeg"
            alt="Teacher"
            width={220}
            height={220}
            className="size-52 object-cover"
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 space-y-5">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-5xl font-extrabold">سيد محمد</h1>

          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <BadgeCheck size={16} />
            مدرب معتمد
          </span>
        </div>

        <p className="text-xl text-muted-foreground">
          Full Stack Developer • React • Next.js • NestJS
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="#"
            className="rounded-xl bg-card px-5 py-3 transition hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <Globe size={18} />
              Portfolio
            </div>
          </Link>

          <Link
            href="#"
            className="rounded-xl bg-card px-5 py-3 transition hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              LinkedIn
            </div>
          </Link>

          <Link
            href="#"
            className="rounded-xl bg-card px-5 py-3 transition hover:bg-muted"
          >
            <div className="flex items-center gap-2">
              <X size={18} />
              Twitter
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeacherHero;
