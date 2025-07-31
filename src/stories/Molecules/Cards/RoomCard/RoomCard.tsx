import {
  Pencil,
  Trash,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import ToggleSwitch from "src/stories/Atoms/Inputs/ToggleSwitch/ToggleSwitch";

type RoomPropsType = {
  room: {
    name: string;
    maxPersons: number;
    attachedServices?: number;
    isEnabled: boolean;
  };
  onToggleChange?: (enabled: boolean) => void;
};

export const RoomCard = ({ room, onToggleChange }: RoomPropsType) => {
  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };

  const settings = [
    {
      icon: <Pencil color="#a29d98" {...iconsProps} />,
      label: "Modifier",
      onclick: () => console.log("Modifier clicked"),
    },
    {
      icon: <Trash color="#F03538" {...iconsProps} />,
      label: "Supprimer",
      onclick: () => console.log("Supprimer clicked"),
    },
  ];

  return (
    <div className="w-full flex flex-col border border-[#E3DFDA] rounded-[8px] p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <ToggleSwitch
            label={room.name}
            value={room.isEnabled}
            size="medium"
            direction="left"
            onChange={() => onToggleChange?.(!room.isEnabled)}
          />
        </div>
        
        <IconButton 
          variant="secondary" 
          settings={settings}
        />
      </div>
      
      <div className="flex flex-col gap-3 text-[14px]">
        <div className="flex items-center gap-2">
          <AlertTriangle color="#A29D98" size={16} className="shrink-0" />
          <span className="text-greyscale-600">Nombre de places max</span>
          <span className="text-greyscale-800 font-light">{room.maxPersons} personnes</span>
        </div>
        
        {room.attachedServices && <div className="flex items-center gap-2">
          <Layers color="#A29D98" size={16} className="shrink-0" />
          <span className="text-greyscale-600">Prestations attachées</span>
          <span className="text-greyscale-800 font-light">{room.attachedServices} prestations</span>
        </div>}
      </div>
    </div>
  );
};