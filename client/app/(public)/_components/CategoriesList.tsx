import { CategoryWithCoursesCount } from "@/services/categories/types";
import Link from "next/link";

const CategoriesList = ({
  categories,
}: {
  categories: CategoryWithCoursesCount[];
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((category) => (
        <Link
          key={category?.id}
          href={`/courses?category=${category?.id}`}
          className="group flex items-center gap-3 rounded-2xl min-w-70 bg-white px-6 py-4 border border-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            {/* <category.icon className="h-5 w-5" /> */}
          </div>

          <div className="text-right">
            <h3 className="font-bold text-secondary group-hover:text-primary transition-colors">
              {category?.name}
            </h3>

            <p className="text-xs text-muted mt-0.5">
              {category?.coursesCount} دورة
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesList;
