import {
  AlarmClock,
  Calendar,
  Clock,
  Pencil,
  ToggleLeft,
  ToggleRight,
  Trash,
  TriangleAlert,
} from "lucide-react";
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

  return (
    <div className="w-full flex flex-col border border-[#E3DFDA] rounded-[8px] p-6">
      <div className="flex justify-between flex-row mb-4">
        <div className="flex flex-row items-center gap-3">
          <p>{facility.name}</p>
          <Tag status={facility.status} />
        </div>
        
        <IconButton 
          variant="secondary" 
          settings={settings}
        />
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