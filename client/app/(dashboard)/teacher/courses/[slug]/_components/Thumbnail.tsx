import Image from "next/image";

const Thumbnail = () => {
  return (
    <section className="col-span-4 h-fit shadow rounded-md p-4">
      <h3 className="text-xl font-bold text-slate-700 mb-2">Course Thumbnail</h3>
      <Image
        src={"/courses/online-course.jpg"}
        alt="online course"
        className="w-full rounded-lg object-cover"
        width={1280}
        height={720}
      />
      <p className="text-sm text-muted-foreground mt-4">
        Recommended size: 1280x720px. Formats: JPG, PNG, WebP. Max 5MB.
      </p>
    </section>
  );
};

export default Thumbnail;
