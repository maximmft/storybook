type PhotoCellPropsType = {
  label?: string;
  variant?: "circular" | "square";
  imageSrc: string;
  size?: "small" | "medium";
};

export default function PhotoCell({
  label,
  variant = "circular",
  imageSrc = "/brochure_hotel.png",
  size = "medium",
}: PhotoCellPropsType) {
  const imageSize = size === "small" ? "w-6 h-6" : "w-8 h-8";

  return (
    <div className="flex items-center gap-2 text-greyscale-700 min-w-0 flex-shrink-0">
      <img
        src={imageSrc}
        alt={label || "Photo"}
        className={`${imageSize} object-cover flex-shrink-0 ${
          variant === "circular" ? "rounded-full" : "rounded-[4px]"
        }`}
      />
      {label && (
        <div className="truncate">
          <span className="text-greyscale-800 text-[12px] font-normal">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
