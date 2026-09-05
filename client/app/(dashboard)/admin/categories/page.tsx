import { Suspense } from "react";

import { categoryServerService } from "@/services/categories/category.server.service";
import type { CategoryWithCoursesCount } from "@/services/categories/types";

import CategoriesList from "./_components/CategoriesList";

const CategoriesPage = async () => {
  let categories: CategoryWithCoursesCount[] = [];

  try {
    const data = await categoryServerService.getAllWithCoursesCount();
    categories = data.categories;
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Failed to fetch categories data.",
    );
  }

  return (
    <main className="px-4 py-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-700">
          Category Management
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Organize and monitor the categories used across the platform.
        </p>
      </header>

      <Suspense fallback={<h3>Loading...</h3>}>
        <CategoriesList categories={categories} />
      </Suspense>
    </main>
  );
};

export default CategoriesPage;
