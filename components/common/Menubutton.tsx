import {IconType} from "react-icons";

type Props = {
  children?: React.ReactNode;
  icon?: IconType;
  variant?: "default" | "outline" |"text"
  className?: string;

};

const variantStyles = {
  default: 'text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900',
  outline: 'border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
  text: 'text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700',
};

export default function Menubutton({ children, icon: Icon, variant, className = "" }: Props) {
  return (
    <button
      className={`inline-flex items-center min-w-[38px] min-h-[38px] rounded px-3 py-1.5
        ${variantStyles[variant || "default"]}
         ${className}`}
    >
      {Icon && <Icon className={`text-lg ${children? " mr-2" : ""}`}/>}
      {children}
    </button>
  );
}
