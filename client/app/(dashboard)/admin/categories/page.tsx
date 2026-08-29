import { Suspense } from "react";

import { categoryServerService } from "@/services/categories/category.server.service";
import type { Category } from "@/services/categories/types";

import CategoriesList from "./_components/CategoriesList";

const CategoriesPage = async () => {
  let categories: Category[] = [];
  let errorMessage = "";

  try {
    const data = await categoryServerService.getAll();
    categories = data.categories;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Failed to load categories";
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

      {/* Error */}
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <Suspense fallback={<h3>Loading...</h3>}>
        <CategoriesList categories={categories} />
      </Suspense>
    </main>
  );
};

export default CategoriesPage;
