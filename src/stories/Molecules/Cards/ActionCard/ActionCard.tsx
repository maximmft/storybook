import { ArrowUp, CopyPlus, LucideIcon } from "lucide-react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

export interface ActionCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  showSecondaryButton?: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const ActionCard = ({
  title,
  description,
  icon: Icon = CopyPlus,
  primaryButtonLabel = "Ajouter une prestation +",
  secondaryButtonLabel = "Importer un fichier Excel",
  showSecondaryButton = true,
  onPrimaryClick,
  onSecondaryClick,
}: ActionCardProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center border border-[#E3DFDA] rounded-[8px] p-6">
      <Icon strokeWidth={1.2} />
      <p className="text-[16px] text-greyscale-900 mb-1">{title}</p>
      <p className="text-[14px] font-light text-greyscale-700">{description}</p>
      <div className="flex flex-row gap-4 mt-6">
        <Button 
          label={primaryButtonLabel} 
          onClick={onPrimaryClick}
        />
        {showSecondaryButton && (
          <Button 
            label={secondaryButtonLabel} 
            variant="secondary" 
            icon={ArrowUp}
            onClick={onSecondaryClick}
          />
        )}
      </div>
    </div>
  );
};