"use client";

import IconButton from "@/components/ui/IconButton";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Controls = () => {
  return (
    <section className="mt-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:flex-row md:items-center md:justify-between">
      <IconButton
        Icon={ArrowRight}
        text="Previous"
        className="order-2 w-full bg-primary px-4 py-2 text-white md:order-1 md:w-auto"
      />

      <div className="order-1 min-w-0 text-center md:order-2">
        <h3 className="truncate text-base font-semibold text-slate-700 sm:text-lg">
          3.4 Advanced System Architecture
        </h3>

        <p className="mt-1 truncate text-sm text-muted-foreground">
          Advanced Cloud Infrastructure & Design
        </p>
      </div>

      <IconButton
        Icon={ArrowLeft}
        text="Next"
        className="order-3 w-full border-2 border-primary bg-white px-4 py-2 text-primary md:w-auto"
      />
    </section>
  );
};

export default Controls;
