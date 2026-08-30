"use client";

import { Category } from "@/services/categories/types";
import { useRouter, useSearchParams } from "next/navigation";

const TopicsList = ({
  categories,
  endpoint,
}: {
  categories: Category[];
  endpoint: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.set("category", slug);
    params.set("page", "1");

    const query = params.toString();

    console.log("PUSH:", `/${endpoint}?${query}`);

    router.push(`/${endpoint}?${query}`);
  };

  return (
    <ul className="my-2 flex flex-wrap items-center gap-1 text-white md:gap-4">
      {categories.map((category) => (
        <li
          key={category.id}
          className="cursor-pointer rounded-2xl bg-secondary px-4 py-2 font-bold"
          onClick={() => handleCategory(category.id)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default TopicsList;
