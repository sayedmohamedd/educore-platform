import { ChevronDown } from "lucide-react";

const Select = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-fit">
      {/* Select */}
      <Select>{children}</Select>
      <ChevronDown
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />
    </div>
  );
};

export default Select;
