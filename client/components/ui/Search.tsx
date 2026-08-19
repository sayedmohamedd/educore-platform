import { Search as Icon } from "lucide-react";
type Props = {
  value?: string;
  onChange?: () => void;
};

const Search = ({ onChange, value }: Props) => {
  return (
    <div className="relative flex-1">
      <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search by transaction ID or user..."
        className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary"
      />
    </div>
  );
};

export default Search;
