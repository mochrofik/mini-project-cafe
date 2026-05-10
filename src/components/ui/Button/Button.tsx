interface PropTypes {
  type?: "button" | "submit" | "reset";
  children: string;
  onClick?: () => void;
  className?: string;
  isloading?: boolean;
}

const Button = (props: PropTypes) => {
  const {
    type = "button",
    children,
    onClick,
    className = "",
    isloading = false,
  } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isloading}
      className={`w-full items-center justify-center flex ${isloading ? "bg-gray-200" : "bg-emerald-600"} ${isloading ? "" : "cursor-pointer"}   text-white rounded rounded-lg ${isloading ? "" : "hover:bg-emerald-900"} shadow-lg shadow-emerald-100  py-1 px-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
