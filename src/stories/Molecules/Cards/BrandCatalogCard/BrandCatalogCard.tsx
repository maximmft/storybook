import { Pencil, Trash } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";

type PromotionCardProps = {
  brandName: string;
  imageUrl: string;
  status: string;
};

export const BrandCatalogCard = ({
  brandName,
  imageUrl,
  status,
}: PromotionCardProps) => {

  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };


  const settings = [
    {
      icon: <Pencil color="#a29d98" {...iconsProps} />,
      label: "Modifier",
      onclick: "",
    },
   
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Supprimer",
      onclick: "",
    },
  ];
  return (
    <div className="w-full flex flex-row justify-between border border-[#E3DFDA] bg-white rounded-[8px] p-4">
      <div className="flex flex-row gap-6">
        <img
          src={imageUrl}
          alt={brandName}
          className="rounded-lg h-[64px] w-[104px]"
        />
        <div className="flex flex-col items-start justify-center">
          <Tag status={status} />
          <p className="text-[16px] mt-2">{brandName}</p>
        </div>
      </div>

      <IconButton settings={settings} variant="tertiary" />
    </div>
  );
};
