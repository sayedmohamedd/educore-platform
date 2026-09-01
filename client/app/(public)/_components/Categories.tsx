/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoriesList from "./CategoriesList";
import { Suspense } from "react";
import { CategoryWithCoursesCount } from "@/services/categories/types";
import { categoryServerService } from "@/services/categories/category.server.service";

const Categories = async () => {
  let categories: CategoryWithCoursesCount[] = [];
  let errorMessage: string = "";
  try {
    const data = await categoryServerService.getAllWithCoursesCount();
    categories = data.categories;
  } catch (error: any) {
    errorMessage = error?.message;
  }

  return (
    <section className="bg-homeBg py-20">
      <div className="container">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary mb-2">
            استكشف مجالات التعلم
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            تعلم في المجال الذي يناسبك
          </h2>

          <p className="text-muted mt-3 max-w-2xl mx-auto">
            اكتشف مجموعة متنوعة من الدورات في أهم المجالات والمهارات المطلوبة.
          </p>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Suspense fallback={<h3>Loading Categories...</h3>}>
          <CategoriesList categories={categories} />
        </Suspense>
      </div>
    </section>
  );
};

export default Categories;
