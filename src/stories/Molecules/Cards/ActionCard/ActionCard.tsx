import { ArrowUp, CopyPlus } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

export interface ActionCardProps {
  title: string;
  description: string;
}

export const ActionCard = ({
  title,
  description,
}: ActionCardProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center border border-[#E3DFDA] rounded-[8px] p-6">
      <CopyPlus strokeWidth={1.2} />
      <p className="text-[16px] text-greyscale-900 mb-1">{title}</p>
      <p className="text-[14px] font-light text-greyscale-700 mb-2">{description}</p>
      <div className="flex flex-row gap-4 mt-6">
        <Button label="Ajouter une prestation +" />
        <Button label="Importer un fichier Excel" variant="secondary" icon={ArrowUp} />
      </div>
    </div>
  );
};