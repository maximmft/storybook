import { FileText, Pause, Play, RotateCcw, Trash, X } from "lucide-react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import { formatBytes } from "src/utils/formatBytes";

interface FileCardProps {
  file: File;
  state: "uploading" | "success" | "error";
  previewUrl?: string;
  progress?: number;
  timeRemaining?: string;
  isPaused?: boolean;
  onPause?: () => void;
  onCancel?: () => void;
  onRetry?: () => void;
  onRemove?: () => void;
  errorMessage?: string;
  draggable?: boolean;
}

export const FileCard = ({
  file,
  state,
  previewUrl,
  progress = 0,
  timeRemaining,
  isPaused = false,
  onPause,
  onCancel,
  onRetry,
  onRemove,
  errorMessage,
  draggable = false,
}: FileCardProps) => {
  const borderColor = state === "error" ? "border-error-100" : "border-greyscale-800";
  const cursorClass = draggable ? "cursor-grab" : "cursor-default";

  const renderFileInfo = () => {
    switch (state) {
      case "uploading":
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">{Math.round(progress)}%</span>
            <span className="text-xs text-gray-500">{timeRemaining}</span>
          </div>
        );
      case "success":
        return <p className="text-[12px] font-light text-greyscale-700">{formatBytes(file.size)}</p>;
      case "error":
        return <p className="text-[12px] font-light text-error-100">{errorMessage}</p>;
    }
  };

  const renderActions = () => {
    if (state === "uploading") {
      return (
        <>
          <IconButton variant="secondary" icon={isPaused ? Play : Pause} onClick={onPause} />
          <IconButton variant="alert" icon={X} onClick={onCancel} />
        </>
      );
    }
    
    if (state === "success" || state === "error") {
      return (
        <>
          <IconButton variant="secondary" icon={RotateCcw} onClick={onRetry} />
          <IconButton variant="alert" icon={Trash} onClick={onRemove} />
        </>
      );
    }
  };

  return (
    <div className={`border border-solid w-full ${borderColor} rounded-lg text-[14px] p-4 transition-all duration-200 ${cursorClass} flex-1`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-row items-center flex-1 min-w-0 mr-3">
            {file.type.startsWith("image/") && previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-[60px] h-10 object-cover rounded-md shrink-0" />
            ) : (
              <FileText size={28} strokeWidth={1} className="shrink-0" />
            )}
            
            <div className="flex flex-col ml-4 min-w-0 flex-1 w-0">
              <p className="text-[14px] truncate" title={file.name}>{file.name}</p>
              <div className="min-w-0 truncate">
                {renderFileInfo()}
              </div>
            </div>
          </div>
          
          <div className="flex flex-row gap-2 flex-shrink-0">
            {renderActions()}
          </div>
        </div>

        {state === "uploading" && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-800 h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};