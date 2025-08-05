import { FileText, FileUp, Pause, Play, RotateCcw, Trash, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import { formatBytes } from "src/utils/formatBytes";
import { getTimeRemaining } from "src/utils/getRemainingTime";

interface UploadingCardProps {
  onFileSelect?: (file: File) => void;
  maxSize?: number;
  acceptedTypes?: string[];
  uploadSpeed?: number;
}

type UploadState = "initial" | "uploading" | "success" | "error";

export const UploadingCard = ({
  onFileSelect,
  maxSize = 10 * 1024 * 1024,
  uploadSpeed = 2,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png", ".zip"],
}: UploadingCardProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("initial");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isFileTypeAccepted = (file: File): boolean => {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return acceptedTypes.includes(fileExtension);
  };

  const processFile = (file: File) => {
    
    if (file.size > maxSize) {
      setSelectedFile(file);
      setUploadState("error");
      return;
    }

    if (!isFileTypeAccepted(file)) {
      setSelectedFile(file);
      setUploadState("error");
      return;
    }
    
    setSelectedFile(file);
    setUploadState("uploading");
    onFileSelect?.(file);
  };

  useEffect(() => {
    if (uploadState === "uploading" && selectedFile && !isPaused) {
      setTotalBytes(selectedFile.size);
      setUploadedBytes(0);
      setStartTime(Date.now());

      if (selectedFile.type.startsWith("image/")) {
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      }

      const bytesPerSecond = uploadSpeed * 1024 * 1024;
      const intervalMs = 100;
      const bytesPerInterval = (bytesPerSecond * intervalMs) / 1000;

      const interval = setInterval(() => {
        setUploadedBytes((prev) => {
          const newUploaded = prev + bytesPerInterval;

          if (newUploaded >= selectedFile.size) {
            clearInterval(interval);
            setUploadedBytes(selectedFile.size);
            setUploadState("success");
            return selectedFile.size;
          }

          return newUploaded;
        });
      }, intervalMs);

      intervalRef.current = interval;

      return () => {
        clearInterval(interval);
        intervalRef.current = null;
      };
    }
  }, [uploadState, selectedFile, uploadSpeed, isPaused]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleCancel = () => {
    setUploadState("initial");
    setSelectedFile(null);
    setUploadedBytes(0);
    setTotalBytes(0);
    setStartTime(0);
    setIsPaused(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleRetry = () => {
    if (selectedFile) {
      setUploadedBytes(0);
      setTotalBytes(0);
      setStartTime(0);
      setIsPaused(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      setUploadState("uploading");
      onFileSelect?.(selectedFile);
    }
  };

  const progressPercentage =
    totalBytes > 0 ? (uploadedBytes / totalBytes) * 100 : 0;

  if (uploadState === "uploading") {
    return (
      <div className="border border-solid rounded-lg text-[14px] p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              {selectedFile?.type.startsWith("image/") && previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-[60px] h-10 object-cover rounded-md shrink-0"
                />
              ) : (
                <FileText size={28} strokeWidth={1} className="shrink-0" />
              )}
              <div className="flex flex-col ml-4 ">
                <p className="text-[14px]">{selectedFile?.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">
                    {Math.round(progressPercentage)}%
                  </span>
                  <span className="text-xs text-gray-500">
                    {getTimeRemaining({
                      uploadedBytes,
                      progressPercentage,
                      startTime,
                      totalBytes,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <IconButton 
                variant="secondary" 
                icon={isPaused ? Play : Pause}
                onClick={handlePauseResume}
              />
              <IconButton variant="alert" icon={X} onClick={handleCancel} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-800 h-2 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (uploadState === "success") {
    return (
      <div className="border border-solid border-greyscale-800 rounded-lg text-[14px] p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              {selectedFile?.type.startsWith("image/") && previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-[60px] h-10 object-cover rounded-md shrink-0"
                />
              ) : (
                <FileText size={28} strokeWidth={1} className="shrink-0" />
              )}
              <div className="flex flex-col ml-4 ">
                <p className="text-[14px]">{selectedFile?.name}</p>
                <p className="text-[12px] font-light text-greyscale-700">
                  {formatBytes(totalBytes)}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
            <IconButton variant="secondary" icon={RotateCcw} onClick={handleRetry} />
            <IconButton variant="alert" icon={Trash} onClick={handleCancel} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (uploadState === "error") {
    return (
      <div className="border border-solid border-error-100 rounded-lg text-[14px] p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              {selectedFile?.type.startsWith("image/") && previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-[60px] h-10 object-cover rounded-md shrink-0"
                />
              ) : (
                <FileText size={28} strokeWidth={1} className="shrink-0" />
              )}
              <div className="flex flex-col ml-4 ">
                <p className="text-[14px]">{selectedFile?.name}</p>
                <p className="text-[12px] font-light text-error-100">
                  Échec du téléchargement
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <IconButton variant="secondary" icon={RotateCcw} onClick={handleRetry} />
              <IconButton variant="alert" icon={Trash} onClick={handleCancel} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (uploadState === "initial") {
    return (
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
        flex flex-col items-center justify-center border border-dashed rounded-lg text-[14px] p-4 cursor-pointer
        transition-all duration-200
        ${isDragActive ? "bg-greyscale-100" : "bg-white"}
      `}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
        />
        <FileUp size={30} strokeWidth={1} className="mb-3" />

        <p>Glissez-déposez votre fichier ici</p>
        <p className="my-1 font-light">ou</p>
        <Button
          label="Sélectionner un fichier"
          variant="secondary"
          onClick={handleButtonClick}
        />
        <p className="text-[10px] text-greyscale-600 font-light mt-2">
          Seul les fichiers {acceptedTypes.join(", ")} seront prise en charge
        </p>
      </div>
    );
  }
};