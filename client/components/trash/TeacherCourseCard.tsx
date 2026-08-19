// components/cards/TeacherCourseCard.tsx

import { Users } from "lucide-react";
import CardBanner from "../shared/cards/CardBanner";

// types/course.ts

type CourseStatus = "published" | "draft" | "archived";

type Props = {
  image: string;
  title: string;
  description: string;
  students: number;
  status: CourseStatus;
};

export default function TeacherCourseCard({
  image,
  title,
  description,
  students,
  status,
}: Props) {
  return (
    <article className="rounded-3xl bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <CardBanner image={image} status={status} />

      <div className="mt-5 space-y-4">
        <div>
          <h3 className="line-clamp-1 text-xl font-semibold">{title}</h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4" />

          <span>{students.toLocaleString()} Students</span>
        </div>

        <button className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
          Edit Course
        </button>
      </div>
    </article>
  );
}
