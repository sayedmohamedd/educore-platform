import { Clock, Star, User } from "lucide-react";
import CardBanner from "./CardBanner";

type CourseStatus = "published" | "draft" | "archived";

type Props = {
  image: string;
  title: string;
  description: string;
  students: number;
  status: CourseStatus;
  actions?: React.ReactNode;
};

const CourseCard = ({
  image,
  title,
  description,
  students,
  status,
  actions,
}: Props) => {
  return (
    <article className="p-2 group bg-white  overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <CardBanner image={image} status={status} />
      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">4.9</span>
          <span className="text-muted-foreground">(5 آلاف تقييم)</span>
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-secondary text-lg font-bold leading-7 transition-colors group-hover:text-primary">
          {title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>

          <span className="text-sm font-medium text-muted-foreground">
            مستر سيد محمد
          </span>
        </div>

        {/* Bottom */}
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-primary">89 ج.م</span>

            <span className="text-sm text-muted-foreground line-through">
              129
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>4 ساعات</span>
          </div>
        </div>
        {actions}
      </div>
    </article>
  );
};

export default CourseCard;
