import { motion } from "framer-motion";

interface PropTypes {
  status: string;
  onclick: () => void;
}

const BadgeStatus = ({ status, onclick }: PropTypes) => {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onclick}
      className={`cursor-pointer text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-sm inline-block
        ${
          status === "COMPLETED"
            ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
            : status === "PROCESSING"
              ? "bg-amber-100 text-amber-700 border border-amber-200"
              : "bg-slate-100 text-slate-700 border border-slate-200"
        }
      `}
    >
      {status}
    </motion.span>
  );
};

export default BadgeStatus;
