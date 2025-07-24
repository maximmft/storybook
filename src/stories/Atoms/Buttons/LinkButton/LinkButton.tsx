import React from "react";

type LinkButtonPropsType = {
  label: string;
  href: string;
  size?: "small" | "medium" | "large";
  icon?: React.ComponentType<any>;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  isActive?: boolean;
};
export const LinkButton = ({
  label,
  href,
  icon: IconComponent,
  iconPosition = "right",
  disabled = false,
  isActive = false,
}: LinkButtonPropsType) => {
  return (
    <a
      href={href}
      aria-disabled={disabled}
      className={`
        flex items-center text-[14px]
        ${
          disabled
            ? "text-greyscale-400 cursor-not-allowed pointer-events-none"
            : isActive
            ? "font-semibold text-greyscale-900"
            : "font-regular text-greyscale-700 hover:text-greyscale-800 active:text-greyscale-900"
        }
      `}
    >
      {iconPosition === "left" && IconComponent && (
        <IconComponent size={14} className="mr-2" />
      )}
      {label}
      {iconPosition === "right" && IconComponent && (
        <IconComponent size={16} className="ml-2" />
      )}
    </a>
  );
};
