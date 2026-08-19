import IconButton from "@/components/ui/IconButton";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Controls = () => {
  return (
    <section className="flex-between bg-white shadow-md rounded-lg p-6 mt-4">
      <IconButton
        Icon={ArrowRight}
        text="Previous"
        className="bg-primary text-white px-4 py-2"
      />
      <div>
        <h3 className="section-title">3.4 Advanced System Architecture</h3>
        <p className="text-muted">Advanced Cloud Infrastructure & Design</p>
      </div>
      <IconButton
        Icon={ArrowLeft}
        text="Next"
        className="bg-white border-primary border-2 text-primary px-4 py-2"
      />
    </section>
  );
};

export default Controls;
