import * as React from "react";

type DayPickerPropsType = {
  day: string;
  onClick: () => void;
  disabled?: boolean;
  isSelected?: boolean;
};

export default function DayPicker({
  day,
  onClick,
  disabled = false,
  isSelected = false,
}: DayPickerPropsType) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-10 w-10 border  rounded-full  group ${
        isSelected ? "bg-primary-800 border-primary-800 hover:opacity-85" : "border-greyscale-400 hover:bg-greyscale-200 hover:border-greyscale-400 active:bg-greyscale-300 active:border-black"
      } ${disabled ? "bg-greyscale-100 border-none" : ""}`}
    >
      <p
        className={` text-[14px] capitalize group-active:font-medium ${
          isSelected ? "text-white" : "group-hover:text-black"
        } ${disabled ? "text-greyscale-500" : "text-greyscale-700"} `}
      >
        {day.slice(0, 1)}
      </p>
    </button>
  );
}
