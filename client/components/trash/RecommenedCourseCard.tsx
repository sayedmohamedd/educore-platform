import { Star, User } from "lucide-react";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const RecommenedCourseCard = () => {
  return (
    <section className="hover:card-up-hover relative shadow-sm rounded-2xl overflow-hidden">
      {/* Badge */}
      <div className="absolute top-2 left-2 rounded-xl text-secondary bg-white px-2 py-1">
        Beginner
      </div>
      {/* Image */}
      <img src="/courses/online-course.jpg" alt="Course" className="w-full" />
      {/* Title */}
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-secondary text-lg font-bold leading-7 transition-colors group-hover:text-primary">
          <Link className="block w-full cursor-pointer" href="/courses/1">الفصل الأول - الفيزياء الكهربية</Link>
        </h3>
        <div className="flex items-center flex-start gap-2">
          <User className="text-muted-foreground w-5 h-5" />
          <p className="text-sm font-medium text-muted">Sayed Mohamed</p>
        </div>
      </div>
      {/* Price */}
      <div className="flex-between px-6 py-4">
        <span className="font-semibold text-muted">49.99$</span>
        <div className="flex-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-muted">4.9</span>
        </div>
      </div>
    </section>
  );
};

export default RecommenedCourseCard;
