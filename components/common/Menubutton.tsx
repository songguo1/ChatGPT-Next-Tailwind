"use client";
import { IconType } from "react-icons";

type Props = {
  children?: React.ReactNode;
  icon?: IconType;
  variant?: "default" | "outline" | "text" | "primary";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const variantStyles = {
  default:
    "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900",
  outline:
    "border border-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700",
  text: "text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700",
  primary:
    "bg-primary-700 text-white hover:bg-primary-800 hover:text-white shadow-sm disabled:shadow-none disabled:bg-transparent disabled:text-gray-300 dark:disabled:text-gray-600",
};

export default function Menubutton({
  children,
  icon: Icon,
  variant,
  className = "",
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className={`transition-colors inline-flex items-center min-w-[38px] min-h-[38px] rounded px-3 py-1.5
        ${variantStyles[variant || "default"]}
         ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className={`text-lg ${children ? " mr-2" : ""}`} />}
      {children}
    </button>
  );
}
