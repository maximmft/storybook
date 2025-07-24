import * as React from "react";
import { Checkbox } from "../../Inputs/Checkbox/Checkbox";

type DropdownItemProps = {
  label: string;
  size?: "small" | "medium" | "large";
  icon?: React.ComponentType<any>;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  isActive?: boolean;
  variant?: "default" | "checkbox";
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  onClick?: () => void;
};

export const DropdownItem = ({
  label,
  icon: IconComponent,
  iconPosition = "right",
  disabled = false,
  isActive = false,
  variant = "default",
  checked = false,
  onCheckChange,
  onClick,
}: DropdownItemProps) => {
  
  const handleClick = () => {
    if (variant === "checkbox" && !disabled && onCheckChange) {
      onCheckChange(!checked);
    } else if (variant === "default" && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`
         flex h-[41px] px-[12px] items-center text-[12px] w-full min-w-[157px] group gap-2
        ${iconPosition === "right" && IconComponent ? "justify-between" : ""}
        ${variant === "checkbox" ? "cursor-pointer" : ""}
        ${
          disabled
            ? "text-greyscale-400 cursor-not-allowed pointer-events-none"
            : isActive || checked
            ? "font-semibold text-greyscale-900 bg-greyscale-200"
            : "bg-white text-greyscale-700 cursor-pointer hover:bg-greyscale-200 active:bg-greyscale-300 active:text-greyscale-900 active:font-semibold focus:bg-greyscale-200"
        }
      `}
      onClick={handleClick}
    >
      {iconPosition === "left" && IconComponent && (
        <IconComponent size={14} className="mr-2" />
      )}
      {label}
      {iconPosition === "right" && variant === "default" && IconComponent && (
        <IconComponent size={16} className="ml-auto" />
      )}

      {variant === "checkbox" && (
        <div className="ml-auto">
          <Checkbox
            checked={checked}
            disabled={disabled}
            onCheckChange={onCheckChange}
          />
        </div>
      )}
    </div>
  );
};