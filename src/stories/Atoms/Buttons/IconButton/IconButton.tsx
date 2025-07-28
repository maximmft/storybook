import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "error";
  size?: "small" | "medium" | "large";
  icon: React.ComponentType<any>;
  disabled?: boolean;
  onClick?: () => void;
}

export const IconButton = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  icon: IconComponent,
  onClick,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "w-10 h-10 flex items-center justify-center rounded-full border shrink-0";

  const getVariantClasses = () => {
    if (variant === "primary") {
      return `bg-primary-800 border-0 text-white 
              enabled:hover:bg-primary-600 
              enabled:active:bg-primary-700 
              disabled:bg-greyscale-200 disabled:text-greyscale-400`;
    }

    if (variant === "secondary") {
      return `bg-white text-primary-800 border-primary-800 
              enabled:hover:bg-greyscale-200 
              enabled:active:bg-greyscale-300 
              disabled:border-greyscale-400 disabled:text-greyscale-400 disabled:bg-transparent`;
    }

    if (variant === "tertiary") {
      return `text-primary-800 rounded-full border-0 
              enabled:hover:bg-greyscale-200
              enabled:active:bg-greyscale-300 
              disabled:text-greyscale-400`;
    }

    if (variant === "quaternary") {
      return `bg-primary-600 border-0 text-white 
              enabled:hover:bg-primary-500 
              enabled:active:bg-primary-600 
              disabled:text-greyscale-400
              disabled:bg-transparent`;
    }

    if (variant === "error") {
      return `border-error-100 text-error-100 
                enabled:hover:bg-error-110 enabled:hover:border-error-110 enabled:hover:text-white 
                enabled:active:border-error-150 enabled:active:bg-error-150 enabled:active:text-white 
                disabled:border disabled:border-greyscale-400 disabled:text-greyscale-400`;
    }
  };

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()}`}
      onClick={onClick}
      {...props}
    >
      <IconComponent size={14} />
    </button>
  );
};
