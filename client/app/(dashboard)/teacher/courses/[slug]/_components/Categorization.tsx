import { X } from "lucide-react";

const Categorization = () => {
  return (
    <section className="col-span-8 my-4 p-4 bg-white shadow rounded-2xl w-full">
      <h3 className="text-xl font-bold text-slate-700">Catrogrization</h3>
      <ul className="flex flex-wrap gap-2 mt-4">
        <li className="flex-center gap-2 text-primary min-w-32 rounded-2xl bg-primary/10 px-4 py-2">
          <span>Design</span>
          <X />
        </li>
        <li className="border-2 border-dotted rounded-2xl text-muted px-4 py-2">
          Add Category
        </li>
      </ul>
    </section>
  );
};

export default Categorization;
