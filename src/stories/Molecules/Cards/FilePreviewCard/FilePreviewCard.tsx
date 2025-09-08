import { Undo2, Trash, Download, FileText } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import PicturePreview from "src/stories/Atoms/Informations/PicturePreview/PicturePreview";

type FilePreviewCardProps = {
  name: string;
  image_url: string;
  size: string;
  downloadable?: boolean;
  onUndo?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
};

const isImageFile = (fileName: string): boolean => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
  const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  return imageExtensions.includes(extension);
};

export const FilePreviewCard = ({
  name,
  image_url,
  size,
  downloadable = false,
  onUndo,
  onDelete,
  onDownload,
}: FilePreviewCardProps) => {
  const isImage = isImageFile(name);

  return (
    <div className="border border-[#3C3A37] p-3.5 flex justify-between items-center rounded-[8px]">
      <div className="flex-1 min-w-0 mr-3">
        {isImage ? (
          <PicturePreview
            direction="horizontal"
            name={name}
            image_url={image_url}
            size={size}
          />
        ) : (
          <div className="w-full gap-4  flex flex-row items-center">
              <FileText size={30} strokeWidth={1} />
            <div className="flex-1 min-w-0">
              <p className="text-[14px] truncate font-medium" title={name}>
                {name}
              </p>
              <p className="text-greyscale-700 text-[12px] truncate" title={size}>
                {size}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-shrink-0">
        {downloadable ? (
          <IconButton icon={Download} variant="secondary" onClick={onDownload} />
        ) : (
          <>
            <IconButton icon={Undo2} variant="secondary" onClick={onUndo} size="small" />
            <IconButton icon={Trash} variant="alert" onClick={onDelete} size="small"/>
          </>
        )}
      </div>
    </div>
  );
};