import {
  FileUp,
  GripVertical,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { formatBytes } from "src/utils/formatBytes";
import { getTimeRemaining } from "src/utils/getRemainingTime";
import { FileCard } from "./FileCard"; 

interface UploadingCardProps {
  onFileSelect?: (file: File) => void;
  onFileRemove?: (file: File) => void;
  maxSize?: number;
  acceptedTypes?: string[];
  uploadSpeed?: number;
}

type UploadState = "initial" | "uploading" | "success" | "error";

interface CompletedFile {
  file: File;
  state: "success" | "error";
  previewUrl?: string;
}

export const UploadingCard = ({
  onFileSelect,
  onFileRemove,
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

  const [completedFiles, setCompletedFiles] = useState<CompletedFile[]>([]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const isFileTypeAccepted = (file: File): boolean => {
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    return acceptedTypes.includes(fileExtension);
  };

  const processFile = (file: File) => {
    if (file.size > maxSize) {
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;
      setCompletedFiles((prev) => [
        ...prev,
        { file, state: "error", previewUrl: preview },
      ]);
      return;
    }

    if (!isFileTypeAccepted(file)) {
      const preview = file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined;
      setCompletedFiles((prev) => [
        ...prev,
        { file, state: "error", previewUrl: preview },
      ]);
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
    if (
      (uploadState === "success" || uploadState === "error") &&
      selectedFile
    ) {
      const completedFile: CompletedFile = {
        file: selectedFile,
        state: uploadState as "success" | "error",
        previewUrl: previewUrl || undefined,
      };

      setCompletedFiles((prev) => [...prev, completedFile]);

      setUploadState("initial");
      setSelectedFile(null);
      setUploadedBytes(0);
      setTotalBytes(0);
      setStartTime(0);
      setIsPaused(false);
      setPreviewUrl(null);
    }
  }, [uploadState, selectedFile, previewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      completedFiles.forEach((file) => {
        if (file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [previewUrl, completedFiles]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
    event.target.value = "";
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

  const handleRemoveCompleted = (fileToRemove: File) => {
    setCompletedFiles((prev) => {
      const fileData = prev.find((f) => f.file === fileToRemove);
      if (fileData?.previewUrl) {
        URL.revokeObjectURL(fileData.previewUrl);
      }
      onFileRemove?.(fileToRemove);
      return prev.filter((f) => f.file !== fileToRemove);
    });
  };

  const handleRetryCompleted = (fileToRetry: File) => {
    setCompletedFiles((prev) => {
      const fileData = prev.find((f) => f.file === fileToRetry);
      if (fileData?.previewUrl) {
        URL.revokeObjectURL(fileData.previewUrl);
      }
      return prev.filter((f) => f.file !== fileToRetry);
    });

    processFile(fileToRetry);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleFileDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleFileDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleFileDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    setCompletedFiles(prev => {
      const newFiles = [...prev];
      const draggedFile = newFiles[draggedIndex];
      
      newFiles.splice(draggedIndex, 1);
      newFiles.splice(dropIndex, 0, draggedFile);
      
      return newFiles;
    });

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const progressPercentage =
    totalBytes > 0 ? (uploadedBytes / totalBytes) * 100 : 0;

  const getErrorMessage = (file: File) => {
    if (file.size > maxSize) {
      return `Fichier trop volumineux (max ${formatBytes(maxSize)})`;
    }
    if (!isFileTypeAccepted(file)) {
      return "Type de fichier non autorisé";
    }
    return "Échec du téléchargement";
  };

  return (
    <div className="flex flex-col gap-4 w-full">
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
          Seuls les fichiers {acceptedTypes.join(", ")} seront pris en charge
        </p>
      </div>

      {uploadState === "uploading" && selectedFile && (
        <FileCard
          file={selectedFile}
          state="uploading"
          previewUrl={previewUrl || undefined}
          progress={progressPercentage}
          timeRemaining={getTimeRemaining({
            uploadedBytes,
            progressPercentage,
            startTime,
            totalBytes,
          })}
          isPaused={isPaused}
          onPause={handlePauseResume}
          onCancel={handleCancel}
        />
      )}

      {completedFiles.map((completedFile, index) => (
        <div 
          key={completedFile.file.name + completedFile.file.size}
          className={`flex flex-row items-center gap-2 transition-color duration-100
            ${draggedIndex === index ? 'opacity-50 transform scale-95' : ''}
            ${dragOverIndex === index ? 'border border-dashed border-greyscale-400 bg-greyscale-100 rounded-lg' : ''}
          `}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleFileDragOver(e, index)}
          onDragLeave={handleFileDragLeave}
          onDrop={(e) => handleFileDrop(e, index)}
        >
          <GripVertical 
            color={draggedIndex === index ? "#000000" : "#D4D0CB"} 
            className="cursor-grab" 
          />
          <FileCard
            file={completedFile.file}
            state={completedFile.state}
            previewUrl={completedFile.previewUrl}
            errorMessage={completedFile.state === "error" ? getErrorMessage(completedFile.file) : undefined}
            onRetry={() => handleRetryCompleted(completedFile.file)}
            onRemove={() => handleRemoveCompleted(completedFile.file)}
            draggable={true} 
          />
        </div>
      ))}
    </div>
  );
};