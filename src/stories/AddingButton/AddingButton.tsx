import { Plus } from "lucide-react";
import React from "react";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  label: string;
  icon: React.ComponentType<any>;
  onClick?: () => void;
}

export const AddingButton = ({
  size = "medium",
  label,
  icon: IconComponent,
  onClick,
  ...props
}: ButtonProps) => {

  return (
    <button className="group border-dashed border h-[60px] w-full p-4 rounded-[8px] hover:bg-greyscale-100" onClick={onClick} {...props}>
      <span className="inline-flex text-[14px] items-center text-primary-800 justify-center border-b border-primary-800 font-regular w-full group-hover:text-primary-500 group-hover:border-primary-500 ">
        {label}
        <Plus size={14} className="ml-2" />
      </span>
    </button>
  );
};
