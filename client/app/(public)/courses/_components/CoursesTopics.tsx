import { categoryServerService } from "@/services/categories/category.server.service";
import { Category } from "@/services/categories/types";
import { Suspense } from "react";
import TopicsList from "./TopicsList";

const CoursesTopics = async () => {
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
    <section>
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      <Suspense fallback={<h3>Loading...</h3>}>
        <TopicsList categories={categories} endpoint="courses" />
      </Suspense>
    </section>
  );
};

export default CoursesTopics;
