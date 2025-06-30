import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  label?: string;
  icon?: React.ComponentType<any>;
  iconPosition?: "left" | "right";
  error?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  variant = "primary",
  size = "medium",
  label,
  error = false,
  disabled = false,
  icon: IconComponent,
  iconPosition = "right",
  onClick,
  ...props
}: ButtonProps) => {
  const baseClasses = "text-[14px] inline-flex items-center justify-center rounded-full px-4 py-[10px] font-regular w-full";
  
  const getVariantClasses = () => {
    if (variant === "primary") {
      if (error) {
        return `bg-error-100 text-white 
                enabled:hover:bg-error-110 
                enabled:active:bg-error-150 enabled:active:border-solid enabled:active:border-2 enabled:active:border-error-50 
                disabled:bg-greyscale-200 disabled:text-greyscale-400`;
      }
      return `bg-primary-800 text-white 
              enabled:hover:bg-primary-600 
              enabled:active:bg-primary-700 
              disabled:bg-greyscale-200 disabled:text-greyscale-400`;
    }
    
    if (variant === "secondary") {
      if (error) {
        return `border border-error-100 text-error-100 
                enabled:hover:bg-error-110 enabled:hover:border-error-110 enabled:hover:text-white 
                enabled:active:border-error-150 enabled:active:bg-error-150 enabled:active:text-white 
                disabled:border disabled:border-greyscale-400 disabled:text-greyscale-400`;
      }
      return `bg-transparent text-primary-800 border border-primary-800 
              enabled:hover:bg-greyscale-200 
              enabled:active:bg-greyscale-300 
              disabled:border-greyscale-400 disabled:text-greyscale-400`;
    }
    
    if (variant === "tertiary") {
      if (error) {
        return `text-error-110 !px-0 h-[28px] rounded-none border-b border-error-110 
              enabled:hover:border-0 enabled:hover:text-error-100 
              enabled:active:border-b enabled:active:border-error-150 enabled:active:text-error-150 
              disabled:border-0 disabled:text-greyscale-400`;
      }
      return `text-primary-800 !px-0 h-[28px] rounded-none border-b border-primary-800 
              enabled:hover:border-0 enabled:hover:text-primary-600 
              enabled:active:border-b enabled:active:border-primary-800 enabled:active:text-primary-800 
              disabled:border-0 disabled:text-greyscale-400`;
    }
  };

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()}`}
      onClick={onClick}
      {...props}
    >
      {iconPosition === "left" && IconComponent && (
        <IconComponent size={14} className="mr-2" />
      )}
      {label}
      {iconPosition === "right" && IconComponent && (
        <IconComponent size={14} className="ml-2" />
      )}
    </button>
  );
};