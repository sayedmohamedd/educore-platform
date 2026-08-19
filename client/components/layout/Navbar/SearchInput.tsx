import { Search } from "lucide-react";

const SearchInput = ({className}:{className?: string}) => {
  return (
    <section className={`flex-center gap-4 ${className}`}>
      <Search className="w-6 h-6" />
      <input type="text" placeholder="Search" className="text-sm font-semibold" />
    </section>
  );
};

export default SearchInput;
