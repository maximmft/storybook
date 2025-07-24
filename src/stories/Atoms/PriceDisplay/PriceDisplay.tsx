import { TrendingDown, TrendingUp } from "lucide-react";
import * as React from "react";

type PriceDisplayPropsType = {
  currentPrice: number;
  initialPrice: number;
  size?: "xs" | "s" | "m" | "lg";
  variant?: "default" | "comparing";
};
export default function PriceDisplay({
  currentPrice,
  initialPrice,
  size = "s",
  variant = "default",
}: PriceDisplayPropsType) {
  const isIncreased = currentPrice - initialPrice > 0;
  const isDecreased = currentPrice - initialPrice < 0;

  const getFontSize = (size: string) => {
    switch (size) {
      case "xs":
        return 10;
      case "s":
        return 12;
      case "m":
        return 14;
      case "lg":
        return 16;
      default:
        return;
    }
  };

  if (variant === "default")
    return (
      <div
        className={`w-full flex flex-row items-center text-[${getFontSize(size)}px]`}
      >
        <p className="mr-1 font-light">{currentPrice} €</p>
        {isIncreased && <TrendingUp color="#4EC06D" size={getFontSize(size)} />}
        {isDecreased && <TrendingDown color="#F03538" size={getFontSize(size)} />}
      </div>
    );

  if (variant === "comparing")
    return (
      <div
        className={`w-full flex flex-row items-center  text-[${getFontSize(size)}px]`}
      >
       {(isDecreased || isIncreased) && <p className="text-greyscale-500 relative mr-1 after:absolute after:left-0 after:top-[45%] after:w-full after:h-px after:bg-current">
          {initialPrice} €
        </p>}
        <p className="mr-1">{currentPrice} €</p>
        {isIncreased && <TrendingUp color="#4EC06D" size={getFontSize(size)} />}
        {isDecreased && <TrendingDown color="#F03538" size={getFontSize(size)} />}
      </div>
    );
}
