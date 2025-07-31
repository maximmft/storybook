import { Ellipsis } from "lucide-react";
import React from "react";

type SettingItem = {
  icon: React.ReactElement; 
  label: string;
  onclick: string | (() => void); 
};

type ButtonPropsBase = {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary" | "alert";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type ButtonPropsWithSettings = ButtonPropsBase & {
  settings: SettingItem[];
  icon?: React.ComponentType<any>; 
};

type ButtonPropsWithoutSettings = ButtonPropsBase & {
  settings?: SettingItem[];
  icon: React.ComponentType<any>; 
};

type ButtonProps = ButtonPropsWithSettings | ButtonPropsWithoutSettings;

export const IconButton = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  icon: IconComponent,
  onClick,
  onMouseEnter,
  onMouseLeave,
  settings,
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

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

    if (variant === "alert") {
      return `border-error-100 text-error-100 bg-white
                enabled:hover:bg-error-110 enabled:hover:border-error-110 enabled:hover:text-white 
                enabled:active:border-error-150 enabled:active:bg-error-150 enabled:active:text-white 
                disabled:border disabled:border-greyscale-400 disabled:text-greyscale-400`;
    }
  };

  const FinalIcon = settings ? Ellipsis : IconComponent!;

  const displaySettings = () => {
    return (
      <div className="absolute top-12 right-0 text-[14px] bg-white w-fit h-fit border border-[#D4D0CB] rounded-[8px] shadow-md z-10">
        {settings?.map((setting, index) => (
          <div
            key={index}
            className="flex flex-row gap-2 items-center h-11 cursor-pointer px-3 hover:bg-greyscale-100"
          >
            {setting.icon}
            <p
              className={`${
                setting.label === "Supprimer"
                  ? "text-error-100"
                  : "text-greyscale-800"
              } font-light whitespace-nowrap`}
            >
              {setting.label}
            </p>
          </div>
        ))}
      </div>
    );
  };

  if (settings) {
    return (
      <div className="relative" onMouseLeave={() => setIsHovered(false)}>
        {isHovered && (
          <div className="absolute -top-2 -right-2 -bottom-2 w-52 h-40 z-0" />
        )}

        <div onMouseEnter={() => setIsHovered(true)}>
          <button
            disabled={disabled}
            className={`${baseClasses} ${getVariantClasses()} ${isHovered ? "bg-[#E3E9E2]" : ""}`}
            onClick={onClick}
            {...props}
          >
            <FinalIcon size={14} />
          </button>
        </div>
        {isHovered && displaySettings()}
      </div>
    );
  }

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      <FinalIcon size={14} />
    </button>
  );
};