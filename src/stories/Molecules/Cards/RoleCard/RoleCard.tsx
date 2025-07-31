import {
  Pencil,
  Settings,
  Trash,
  User,
} from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";

type RoleCardPropsType = {
  user: {
    role: string;
  };
};

export const RoleCard = ({ user }: RoleCardPropsType) => {
  const iconsProps = {
    size: 14,
    className: "shrink-0",
  };

  const settings = [
    {
      icon: <Pencil color="#a29d98" {...iconsProps} />,
      label: "Modifier les droits d'accès",
      onclick: () => console.log("Modifier clicked"),
    },
    {
      icon: <User color="#a29d98" {...iconsProps} />,
      label: "Modifier le rôle",
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
          {user.role}
        </div>
        
        <IconButton 
          variant="secondary" 
          settings={settings}
        />
      </div>
      <div className="flex items-center gap-2 text-[14px]">
          <Settings color="#A29D98" size={16} className="shrink-0" />
          <span className="text-greyscale-600">Paramètres</span>
          <span className="text-greyscale-800 font-light">Accès à la gestion des paramètres.</span>
        </div>
    

    </div>
  );
};