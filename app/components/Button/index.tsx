import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-[200px] h-[48px] py-3 px-6 rounded-3xl font-medium text-white transition-colors duration-200
    ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gray-400 hover:bg-orange-600 active:bg-orange-700"
    }
    ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
