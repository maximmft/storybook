import { Trash, Eye, StarIcon, User, Pencil } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { Checkbox } from "src/stories/Atoms/Inputs/Checkbox/Checkbox";

type EstablishmentType = {
  name: string;
  category: string;
  starRating: number;
  imageUrl: string;
  status?: string;
};

type CompanyType = {
  name: string;
  contactName: string;
};

type ManagerType = {
  name: string;
  imageUrl: string;
};

type SpaCardPropsType = {
  variant: "default" | "selectable";
  establishment: EstablishmentType;
  company: CompanyType;
  manager: ManagerType;
  isSelected?: boolean;
  onSelect?: () => void;
};

export const SpaCard = ({ 
  variant, 
  establishment,
  company,
  manager,
  isSelected = false,
  onSelect
}: SpaCardPropsType) => {
  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };

  const settings = [
    {
      icon: <Eye color="#a29d98" {...iconsProps} />,
      label: "Voir les détails",
      onclick: () => {},
    },
    {
      icon: <Pencil color="#a29d98" {...iconsProps} />,
      label: "Modifier l'account manager",
      onclick: () => {},
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Archiver l'établissement",
      onclick: () => {},
    },
  ];

  const isDefault = variant === "default";

  const headerLayout = isDefault
    ? "flex-col"
    : "flex-row justify-between w-full";

  const textWeight = isDefault ? "font-normal" : "font-light";

  return (
    <div
      className={`w-full flex flex-row border bg-white rounded-[8px] gap-6 p-6 ${
        isSelected ? "border-[#2D2A27] bg-greyscale-100" : "border-[#E3DFDA] bg-white"
      }`}
    >
      {variant === "selectable" && (
        <div className="flex items-start">
          <Checkbox checked={isSelected} onChange={onSelect} />
        </div>
      )}
      <img
        src={establishment.imageUrl}
        alt={establishment.name}
        className={`w-[106px] h-[111px] object-cover rounded-lg`}
      />

      <div className="flex flex-col w-full justify-between">
        <div className="flex justify-between items-start w-full">
          <div className={`flex gap-1 ${headerLayout}`}>
            <div className="flex flex-col items-start mb-2">
              <span className="flex flex-row items-center text-[14px] font-light mb-1">
                {establishment.starRating} <StarIcon fill="black" className="ml-[2px]" size={12} />
              </span>
              <h3 className="text-[16px] font-normal text-[#3C3A37] leading-tight">
                {establishment.name}
              </h3>
              <p className="text-[14px] font-light">{establishment.category}</p>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center gap-2">
            <Tag status={establishment.status} />
            <IconButton variant="tertiary" settings={settings} />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex flex-row items-center text-[12px] gap-2">
              <span className="text-[16px]"> 🇫🇷 </span>
              <p className={`text-greyscale-700 ${textWeight}`}>
                {company.name}
              </p>
            </div>
            <div className="flex flex-row items-center text-[12px] gap-2">
              <User color="#A29D98" size={16} />
              <p className={`text-greyscale-700 ${textWeight}`}>
                {company.contactName}
              </p>
            </div>
          </div>

          <div className="ml-4">
            <Button
              label={
                <PhotoCell
                  size="small"
                  imageSrc={manager.imageUrl}
                  label={manager.name}
                />
              }
              className="h-[40px]"
              variant="tertiary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};