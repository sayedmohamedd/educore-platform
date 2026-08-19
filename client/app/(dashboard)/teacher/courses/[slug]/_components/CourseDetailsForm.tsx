import Input from "@/components/shared/form/Input";

const CourseDetailsForm = () => {
  return (
    <section className="col-span-8 shadow bg-white rounded-2xl p-4">
      <h3 className="text-xl font-bold text-slate-700">Primary Details</h3>
      <form className="mt-10 space-y-6">
        <Input label="Course Title" placeholder="Couse Title" />
        <Input label="URL Slug" placeholder="URL Slug" />
        <Input label="Description" placeholder="description" />
      </form>
    </section>
  );
};

export default CourseDetailsForm;
