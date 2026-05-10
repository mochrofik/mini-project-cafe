import { Eye, EyeOff } from "lucide-react";

interface PropTypes {
  label?: string;
  name: string;
  id: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  showPassword?: boolean;
  value?: string;
  readonly?: boolean;
  onClick?: () => void;
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
    showPassword = false,
    value,
    readonly = false,
    onClick,
  } = props;

  return (
    <div className="w-full">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : type}
          name={name}
          value={value}
          required={required}
          readOnly={readonly}
          placeholder={placeholder}
          className={`${className}  w-full p-2 rounded border border-gray-300  outline-none focus:border-blue-600  `}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={onClick}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff size={20} aria-hidden="true" />
            ) : (
              <Eye size={20} aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
