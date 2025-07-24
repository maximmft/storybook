import * as React from "react";

type DatePickerCalendarPropsType = {
  date: string;
  onClick: () => void;
  disabled: boolean;
  isSelected?: boolean;
};

export default function DatePickerCalendar({
  date,
  onClick,
  disabled = false,
  isSelected = false,
}: DatePickerCalendarPropsType) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center h-10 w-10 rounded-full  group ${
        isSelected ? "bg-primary-800 border-primary-800 hover:opacity-85" : "border-greyscale-400 hover:bg-greyscale-200 active:bg-greyscale-300"
      } `}
    >
      <p
        className={` text-[14px] capitalize group-active:font-medium ${
          isSelected ? "text-white" : "group-hover:text-black"
        } ${disabled ? "text-greyscale-500" : "text-greyscale-700"} `}
      >
        {date}
      </p>
    </button>
  );
}
