interface PropTypes {
  label?: string;
  name: string;
  id: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  className?: string;
}

const Input = (props: PropTypes) => {
  const {
    label,
    name,
    id,
    type = "text",
    placeholder,
    required = false,
    className,
  } = props;

  return (
    <label htmlFor={id} className="font-medium">
      {label}
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={`${className}  w-full p-2 rounded border border-gray-300  outline-none focus:border-blue-600  `}
      />
    </label>
  );
};

export default Input;
