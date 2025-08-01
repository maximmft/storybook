import { Trash, StarIcon, User, UserPlus, Check, Component } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { timeAgo } from "src/utils/TimeAgo";

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

type TagsType = {
  status: string;
  inboundStatus: string;
  salesman?: {
    name: string;
  };
};

type MetadataType = {
  createdAt: number | string;
};

type ProspectCardProps = {
  variant: "default" | "selectable";
  establishment: EstablishmentType;
  company: CompanyType;
  manager: ManagerType;
  tags: TagsType;
  metadata: MetadataType;
  isSelected?: boolean;
  onSelect?: () => void;
};

export const ProspectCard = ({
  establishment,
  company,
  tags,
  metadata,
}: ProspectCardProps) => {
  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };

  const settings = [
    {
      icon: <Component color="#a29d98" {...iconsProps} />,
      label: "Item",
      onclick: () => {},
    },
    {
      icon: <Check color="#a29d98" {...iconsProps} />,
      label: "Déployer le prospect",
      onclick: () => {},
    },
    {
      icon: <UserPlus color="#a29d98" {...iconsProps} />,
      label: "Assigner un sales",
      onclick: () => {},
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Prospect perdu",
      onclick: () => {},
    },
  ];

  return (
    <div
      className="w-full flex flex-row border border-[#E3DFDA] bg-white rounded-[8px] gap-6 p-6"
    >
      <div className="flex flex-col w-full justify-between">
        <div className="flex justify-between items-start w-full">
          <div className={`flex gap-2 flex-col`}>
            <Tag status={tags.status} />

            <div className="flex flex-col items-start mb-2">
              <div className="flex flex-row-reverse gap-2">
                <span className="flex flex-row items-center text-[14px] font-normal mb-1">
                  {establishment.starRating}{" "}
                  <StarIcon fill="black" className="ml-[2px]" size={12} />
                </span>
                <h3 className="text-[16px] font-normal text-[#3C3A37] leading-tight">
                  {establishment.name}
                </h3>
              </div>
              <p className="text-[14px] font-light">{establishment.category}</p>
            </div>
          </div>

          <IconButton variant="tertiary" settings={settings} />
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex flex-row items-center text-[12px] gap-2">
              <span className="text-[16px]"> 🇫🇷 </span>
              <p className={`text-greyscale-700 font-normal`}>
                {company.name}
              </p>
            </div>
            <div className="flex flex-row items-center text-[12px] gap-2">
              <User color="#A29D98" size={16} />
              <p className={`text-greyscale-700 font-normal`}>
                {company.contactName}
              </p>
            </div>
          </div>
          <div>
            <p className="text-[12px] text-end font-light text-greyscale-600 mb-1">
              Créé {timeAgo(metadata.createdAt)}
            </p>
            <div className="flex items-end gap-2">
              <Tag status={tags.inboundStatus} />
              {tags.salesman && (
                <Tag 
                  label={tags.salesman.name} 
                  variant={8} 
                  icon={<User/>}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};