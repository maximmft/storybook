import { SuitcaseIcon } from "@phosphor-icons/react/dist/ssr";
import { Trash, Eye, Send, Mail } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import RadioButton from "src/stories/Atoms/Inputs/RadioButton/RadioButton";

export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  role: "administrator" | "user";
  status: "active";
  mail: string;
  jobTitle: string;
};

type UserCardPropsType = {
  variant: "default" | "selectable" | "selectableSmall";
  user: UserType;
  onSelect: (value: string) => void;
  selectedUser?: string;
};

export const UserCard = ({
  variant,
  user,
  onSelect,
  selectedUser
}: UserCardPropsType) => {
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
      icon: <Send color="#a29d98" {...iconsProps} />,
      label: "Envoyer une relance",
      onclick: () => {},
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Archiver",
      onclick: () => {},
    },
  ];

  const isDefault = variant === "default";
  const isSelectable = variant === "selectable";
  const isSelectableSmall = variant === "selectableSmall";
  const isSelected = user.id === selectedUser

  const imageSize = isDefault
    ? "w-[106px] h-[106px]"
    : isSelectable
    ? "w-[61px] h-[61px]"
    : "w-[31px] h-[31px]";

  const headerLayout = isDefault
    ? "flex-col"
    : "flex-row justify-between w-full";

  const contentLayout =
    isDefault || isSelectableSmall ? "flex flex-col" : "flex flex-row gap-4";

  const textWeight = isDefault ? "font-normal" : "font-light";

  return (
    <div
      className={`w-full flex flex-row border rounded-[8px]  gap-6 ${
        isSelectableSmall ? "p-4" : "p-6"
      } ${isSelected ? "border-[#2D2A27] bg-greyscale-100 " : "border-[#E3DFDA] bg-white" }`}
    >
      {!isSelectableSmall && (
        <img
          src="/brochure_hotel.png"
          alt="Sophie Dupont"
          className={`${imageSize} object-cover rounded-full`}
        />
      )}

      <div className="flex flex-col w-full justify-between">
        <div className="flex justify-between items-center w-full">
          <div className={`flex gap-1 ${headerLayout}`}>
            <div className="flex items-center gap-2 mb-2">
              {isSelectableSmall && (
                <img
                  src="/brochure_hotel.png"
                  alt="Sophie Dupont"
                  className={`${imageSize} object-cover rounded-full`}
                />
              )}
              <h3 className="text-[18px] font-normal text-[#3C3A37] leading-tight">
                {user.firstname} {user.lastname}
              </h3>
            </div>

            {!isSelectableSmall && <Tag status={user.role} />}
          </div>

          {isDefault && (
            <div className="flex flex-row items-center gap-2 mb-3">
              <Tag status={user.status} />
              <IconButton variant="tertiary" settings={settings} />
            </div>
          )}
        </div>

        <div className={contentLayout}>
          <div className="flex flex-row items-center text-[12px] gap-2">
            <SuitcaseIcon color="#A29D98" size={14} />
            <p className={`text-greyscale-800 ${textWeight}`}>
              {user.jobTitle}
            </p>
          </div>
          <div className="flex flex-row items-center text-[12px] gap-2">
            <Mail color="#A29D98" size={12} />
            <p className={`text-greyscale-800 ${textWeight}`}>
            {user.mail}
            </p>
          </div>
        </div>
      </div>

      {(isSelectable || isSelectableSmall) && (
        <RadioButton label="" id={user.id} value={user.id} checked={isSelected} onChange={() => onSelect(user.id)}/>
      )}
    </div>
  );
};
