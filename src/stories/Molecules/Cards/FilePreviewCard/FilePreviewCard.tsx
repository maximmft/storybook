import { Undo2, Trash } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import PicturePreview from "src/stories/Atoms/Informations/PicturePreview/PicturePreview";

type FilePreviewCardProps = {
  name: string;
  image_url: string;
  size: string;
  onUndo?: () => void;
  onDelete?: () => void;
};

export const FilePreviewCard = ({
  name,
  image_url,
  size,
  onUndo = () => {},
  onDelete = () => {},
}: FilePreviewCardProps) => {
  return (
    <div className="border border-[#3C3A37] p-3 flex justify-between items-center rounded-[8px]">
      <div className="flex-1 min-w-0 mr-3">
        <PicturePreview
          direction="horizontal"
          name={name}
          image_url={image_url}
          size={size}
        />
      </div>
      
      <div className="flex gap-2 flex-shrink-0">
        <IconButton
          icon={Undo2}
          variant="secondary"
          onClick={onUndo}
        />
        <IconButton
          icon={Trash}
          variant="alert"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};