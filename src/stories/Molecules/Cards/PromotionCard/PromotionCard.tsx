import { Clock, Pencil } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";

type PromotionCardProps = {
  title: string;
  imageUrl: string;
  duration: string;
  status: string;
  hasError?: boolean;
  onEdit?: () => void;
};

export const PromotionCard = ({
  title,
  imageUrl,
  duration,
  status,
  hasError = false,
  onEdit,
}: PromotionCardProps) => {
  const isError = status === "error" || hasError;
  const durationColor = isError ? "#F03538" : "#A29D98";
  const durationTextColor = isError ? "text-[#F03538]" : "text-greyscale-600";

  return (
    <div className="w-full flex flex-row border border-[#E3DFDA] bg-white rounded-[8px] gap-6 p-6">
      <img 
        src={imageUrl} 
        alt={title} 
        className="rounded-lg h-[78px] w-[106px]"
      />
      <div>
        <Tag status={status}/>
        <p className="text-[16px] my-2">{title}</p>
        <div className="text-[12px] flex flex-row gap-2 items-center">
          <Clock size={14} color={durationColor}/>
          <p className={durationTextColor}>Durée</p>
          <p className={`${durationTextColor} font-light`}>{duration}</p>
        </div>
      </div>
      <IconButton icon={Pencil} variant="tertiary" onClick={onEdit}/>
    </div>
  );
};