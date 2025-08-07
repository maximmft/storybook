import * as React from "react";

type PicturePreviewPropsType = {
  image_url: string;
  name: string;
  size: string;
  direction?: "horizontal" | "vertical";
};

export default function PicturePreview({
  image_url,
  name,
  size,
  direction = "vertical",
}: PicturePreviewPropsType) {
  const styles = {
    vertical: {
      container: "w-full gap-4 flex flex-col",
      image: "h-[108px] w-full rounded-[8px] object-cover",
      textContainer: "w-full",
    },
    horizontal: {
      container: "w-full gap-4 flex flex-row items-center",
      image: "h-[40px] w-[60px] flex-shrink-0 rounded-[8px] object-cover",
      textContainer: "flex-1 min-w-0", 
    },
  };

  const currentStyles = styles[direction];

  return (
    <div className={currentStyles.container}>
      <img
        src={image_url}
        alt={name}
        className={currentStyles.image}
      />
      <div className={currentStyles.textContainer}>
        <p className="text-[14px] truncate font-medium" title={name}>
          {name}
        </p>
        <p className="text-greyscale-700 text-[12px] truncate" title={size}>
          {size}
        </p>
      </div>
    </div>
  );
}