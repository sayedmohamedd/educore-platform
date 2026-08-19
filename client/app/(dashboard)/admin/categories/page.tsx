/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Search as Icon, User } from "lucide-react";
import { categories as data } from "@/lib/data";
import CategoryCard from "./_components/CategoryCard";
import { useEffect, useState } from "react";
import IconButton from "@/components/ui/IconButton";
const Categories = () => {
  const [categories, setcategories] = useState(data);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const handleChange = () => {
      const newdata = data.filter((cat) =>
        cat.title.toLowerCase().includes(search.toLowerCase()),
      );
      setcategories(() => newdata);
    };
    handleChange();
  }, [search]);

  return (
    <main>
      <div className="container p-4 py-8">
        <header className="mb-4 flex flex-col">
          <h2 className="text-right text-xl text-slate-900 font-semibold">
            Category Management
          </h2>
          <div className="flex-between flex-col md:flex-row gap-2">
            <p className="text-muted md:flex-1 text-right">
              Organise Categories from admin dashbaord
            </p>
            <div className="relative flex-1">
              <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by transaction ID or user..."
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary"
              />
            </div>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.slice(0,8).map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </section>
        <div className="flex gap-6 my-4">
          {/* Chart */}
          <section className="p-4 rounded-2xl flex-1 bg-white shadow ">
            <div className="flex-between py-2">
              <h4 className="text-xl text-slate-900 font-semibold">
                Category Analytics
              </h4>
              <span className="link font-semibold">View Report</span>
            </div>
          </section>
          {/* Audit */}
          <section className="px-8 py-4 rounded-2xl text-center shadow text-white bg-[#283044]">
            <h4 className="page-title text-white">System Health</h4>
            <div className="mt-4 text-lg font-medium">
              <p className="flex-between">
                Total Categories <span>12</span>
              </p>
              <p className="flex-between mt-2">
                Orphaned Courses <span>0</span>
              </p>
            </div>
            <IconButton
              className="my-4 bg-secondary font-semibold text-white "
              text="Run Organization Audit"
              Icon={User}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Categories;