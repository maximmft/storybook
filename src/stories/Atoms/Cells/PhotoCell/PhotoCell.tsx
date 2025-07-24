import * as React from "react";

type PhotoCellPropsType = {
  label?: string;
  variant?: "circular" | "square";
  imageSrc?: string;
};

export default function PhotoCell({
  label,
  variant = "circular",
  imageSrc = "/brochure_hotel.png",
}: PhotoCellPropsType) {
  return (
    <div className="flex items-center gap-3 text-greyscale-700 h-[52px] w-full px-4 py-2">
      <img
        src={imageSrc}
        alt={label || "Photo"}
        className={`w-8 h-8 object-cover ${
          variant === "circular" ? "rounded-full" : "rounded-[4px]"
        }`}
      />
      {label && (
        <span className="text-greyscale-800 text-[12px] font-normal">
          {label}
        </span>
      )}
    </div>
  );
}