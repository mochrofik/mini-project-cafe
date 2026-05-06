import type { ReactNode } from "react";

interface PropTypes {
  id: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

const SelectUI = (props: PropTypes) => {
  const { value, id, name, onChange, children } = props;
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="border w-full border-slate-200 rounded-lg outline-none outline-none focus:ring-2 focus:ring-blue-500/20  pl-2 pr-4 py-2"
    >
      {children}
    </select>
  );
};

export default SelectUI;
