import { TrendingUp, TrendingDown } from "lucide-react";
import * as React from "react";

type PricingTagsPropsType = {
  label: string;
  isIncreased?: boolean;
  isDecreased?: boolean;
  initialPrice: number;
  currentPrice: number;
  color: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary";
  variant: "full" | "percentage"
};

const baseTagsStyle =
  "flex flex-col w-full rounded-[4px] justify-center gap-1 items-center px-2.5 py-1 text-[10px] capitalize font-regular";

export default function PricingTags({
  label,
  isIncreased,
  isDecreased,
  initialPrice,
  currentPrice,
  color,
  variant

}: PricingTagsPropsType) {
  const getVariantClasses = () => {
    if (color === "primary") {
      return "bg-[#EEF5FB] text-[#5A6E81]";
    }
    if (color === "secondary") {
      return "bg-[#FDF5EF] text-[#B04D1C]";
    }
    if (color === "tertiary") {
      return "bg-[#FDF8EC] text-[#8B6309]";
    }
    if (color === "quaternary") {
      return "bg-[#E6F0E7] text-[#486060]";
    }
    if (color === "quinary") {
      return "bg-[#F7EFE8] text-[#796758]";
    }
  };
  if (variant === "full")
  return (
    <div className={`${baseTagsStyle} ${getVariantClasses()} `}>
      <div className="flex flex-row items-center justify-center ">
        {isIncreased && (
          <TrendingUp size={12} strokeWidth={3} className="mr-1" />
        )}
        {isDecreased && (
          <TrendingDown size={10} strokeWidth={3} className="mr-1" />
        )}
        <span>{label}</span>
      </div>
      <p>{currentPrice}€</p>
    </div>
  );

  if (variant === "percentage")
    return (
      <div className={`${baseTagsStyle} ${getVariantClasses()} `}>
      <div className="flex flex-row items-center justify-center ">
        {isIncreased && (
          <TrendingUp size={12} strokeWidth={3} className="mr-1" />
        )}
        {isDecreased && (
          <TrendingDown size={10} strokeWidth={3} className="mr-1" />
        )}
      </div>
      <p>{((currentPrice - initialPrice) / initialPrice * 100).toFixed(0)} %</p>
      </div>
  )
}
