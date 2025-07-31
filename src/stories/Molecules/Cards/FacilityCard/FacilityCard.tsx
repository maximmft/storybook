import {
  AlarmClock,
  Calendar,
  Clock,
  Ellipsis,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Trash,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";

type FacilityPropsType = {
  facility: {
    name: string;
    status: string;
    openingHours: string;
    capacity: number;
    layoverTime: number;
    image: string;
    closingDateStart?: string;
    closingDateEnd?: string;
  };
};

export const FacilityCard = ({ facility }: FacilityPropsType) => {
  const [isHovered, setIsHovered] = useState(false);

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
      icon:
        facility.status === "disabled" ? (
          <ToggleLeft color="#a29d98" {...iconsProps} />
        ) : (
          <ToggleRight color="#a29d98" {...iconsProps} />
        ),
      label:
        facility.status === "disabled"
          ? "Réactiver l'installation"
          : "Désactiver l'installation",
      onclick: facility.status === "disabled" ? " " : "",
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Supprimer",
      onclick: "",
    },
  ];

  const displaySettings = () => {
    return (
      <div className="absolute top-12 right-0 text-[14px] bg-white w-fit h-fit border border-[#D4D0CB] rounded-[8px] shadow-md z-10">
        {settings.map((setting, index) => (
          <div
            key={index}
            className="flex flex-row gap-2 items-center h-11 cursor-pointer px-3  hover:bg-greyscale-100"
          >
            {setting.icon}
            <p
              className={`${
                setting.label === "Supprimer"
                  ? "text-error-100"
                  : "text-greyscale-800"
              } font-light whitespace-nowrap`}
            >
              {setting.label}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col border border-[#E3DFDA] rounded-[8px] p-6">
      <div className="flex justify-between flex-row mb-4">
        <div className="flex flex-row items-center gap-3">
          <p>{facility.name}</p>
          <Tag status={facility.status} />
        </div>
        <div className="relative" onMouseLeave={() => setIsHovered(false)}>
          {isHovered && (
            <div className="absolute -top-2 -right-2 -bottom-2 w-52 h-40 z-0" />
          )}

          <div onMouseEnter={() => setIsHovered(true)}>
            <IconButton variant="secondary" icon={Ellipsis} />
          </div>
          {isHovered && displaySettings()}
        </div>
      </div>
      <div className="flex flex-row gap-x-4 items-center">
        {facility.status !== "disabled" && (
          <img
            src={facility.image || "/brochure_hotel.png"}
            alt={facility.name}
            className="w-[115px] h-[100px] rounded-[8px] object-cover"
          />
        )}
        {facility.status === "active" ? (
          <div className="flex flex-col text-[14px] gap-2">
            <div className="flex flex-row gap-2">
              <Clock color="#a29d98" size={18} />
              <p className="text-greyscale-600">Horaires d'ouverture</p>
              <p className="text-greyscale-800 font-light">
                {facility.openingHours}
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <AlarmClock color="#a29d98" size={18} />
              <p className="text-greyscale-600">Temps de battement</p>
              <p className="text-greyscale-800 font-light">
                {facility.layoverTime} min
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <TriangleAlert color="#a29d98" size={18} />
              <p className="text-greyscale-600">Capacité personne max</p>
              <p className="text-greyscale-800 font-light">
                {facility.capacity} personnes/heure
              </p>
            </div>
          </div>
        ) : facility.status === "inactive" ? (
          <div className="text-[14px]">
            <p className="text-greyscale-800 font-light mb-2">
              Fermeture pour maintenant
            </p>
            <div className="flex flex-row gap-2">
              <Calendar color="#a29d98" size={18} />
              <p className="text-greyscale-600">Date de fermeture</p>
              <p className="text-greyscale-800 font-light">
                {facility.closingDateStart} - {facility.closingDateEnd}
              </p>
            </div>
          </div>
        ) : facility.status === "disabled" ? (
          <div className="bg-greyscale-100 p-6 rounded-[8px] w-full">
            <p className="text-greyscale-600 text-[14px] font-light text-center">
              Installation désactivée sur la marketplace
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
