import type { ReactNode } from "react";

interface PropTypes {
  id: string;
  children: ReactNode;
}
const CardUI = (props: PropTypes) => {
  const { children } = props;
  return <div className="bg-white p-5 rounded-lg shadow-sm">{children}</div>;
};

export default CardUI;
