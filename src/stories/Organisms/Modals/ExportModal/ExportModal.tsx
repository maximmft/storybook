import { X } from "lucide-react";
import { ReactElement } from "react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

type FormModalPropsType = {
  children: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  title: string | ReactElement;
  onSubmit?: () => void;
  maxHeight: string;
  maxWidth: string;
};

export const ExportModal = ({
  children,
  isOpen,
  onClose,
  title,
  onSubmit,
  maxWidth,
  maxHeight,
}: FormModalPropsType) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-20 z-[9998]" onClick={onClose} />
          
          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
            <div
              className="bg-white border p-6 border-greyscale-400 rounded-2xl w-full shadow-2xl flex flex-col pointer-events-auto"
              style={{
                maxWidth: maxWidth,
                maxHeight: maxHeight,
              }}
            >
              <div className="">
                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                  <h2 className="text-[20px] font-normal text-greyscale-800">
                    {title}
                  </h2>
                  <IconButton icon={X} variant="secondary" onClick={onClose} />
                </div>
             
              </div>
              <div className="overflow-y-auto pr-6 flex-1 min-h-0">
                {children}
              </div>

              <div className="flex gap-4 pt-8 flex-shrink-0">
                <Button variant="secondary" label="Annuler" onClick={onClose} />
                <Button variant="primary" label="Exporter" onClick={onSubmit} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};