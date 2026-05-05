interface PropTypes {
  type?: "button" | "submit" | "reset";
  children: string;
  onClick?: () => void;
  className?: string;
}

const Button = (props: PropTypes) => {
  const { type = "button", children, onClick, className = "" } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full items-center justify-center flex bg-blue-600 text-white rounded rounded-lg hover:bg-blue-900 cursor-pointer py-1 px-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
