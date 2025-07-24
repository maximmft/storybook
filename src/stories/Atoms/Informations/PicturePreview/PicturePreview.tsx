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
    },
    horizontal: {
      container: "w-full gap-4 flex flex-row",
      image: "h-[40px] w-full rounded-[8px] object-cover",
    },
  };

  const currentStyles = styles[direction]

  return (
    <div
      className={currentStyles.container}
    >
      <img
        src={image_url}
        alt={name}
        className={currentStyles.image}
      />
      <div>
        <p className="text-[14px] font-medium"> {name}</p>
        <p className="text-greyscale-700 text-[12px]"> {size}</p>
      </div>
    </div>
  );
}
