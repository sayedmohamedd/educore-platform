import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

type Teacher = {
  id: string;
  user: {
    fullName: string;
    avatar: {
      url: string;
    } | null;
  };
  title: string | null;
  bio: string | null;
  expertise: string | null;
  _count: {
    courses: number;
  };
};

type Props = {
  teacher: Teacher;
};

const TeacherCard = ({ teacher }: Props) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Avatar */}
      <div className="flex justify-center pt-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-primary/10">
          {teacher.user.avatar ? (
            <Image
              src={"/mentors/sayed.jpeg"}
              alt={teacher.user.fullName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-semibold text-primary">
              {teacher.user.fullName.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h2 className="font-semibold text-slate-700">
          {teacher.user.fullName}
        </h2>

        {teacher.title && (
          <p className="mt-1 text-sm font-medium text-primary">
            {teacher.title}
          </p>
        )}

        {teacher.bio && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {teacher.bio}
          </p>
        )}

        {teacher.expertise && (
          <p className="mt-4 line-clamp-2 text-xs text-muted-foreground">
            {teacher.expertise}
          </p>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BookOpen size={16} className="text-primary" />
            <span>{teacher._count.courses} Courses</span>
          </div>

          <Link
            href={`/teachers/${teacher.id}`}
            className="flex items-center gap-1 text-sm font-medium text-primary transition hover:text-secondary"
          >
            View Profile
            <ArrowLeft size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default TeacherCard;
