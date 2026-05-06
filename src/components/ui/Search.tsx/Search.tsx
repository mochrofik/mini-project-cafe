import { SearchIcon } from "lucide-react";

interface PropTypes {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchUI = (props: PropTypes) => {
  const { value, onChange } = props;
  return (
    <div className="relative w-full">
      <SearchIcon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search & Enter..."
        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchUI;
