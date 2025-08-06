import { X } from "lucide-react";
import { ReactElement } from "react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

type FormModalPropsType = {
  children: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSubmit?: () => void;
};

export const FormModal = ({
  children,
  isOpen,
  onClose,
  subtitle,
  title,
  onSubmit,
}: FormModalPropsType) => {


  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex  items-center justify-center z-50">
          <div className="bg-white border p-6 border-greyscale-400 rounded-lg max-h-[587px] max-w-[527px] w-full shadow-2xl flex flex-col">
            <div className="">
              <div className="flex items-center justify-between mb-2  flex-shrink-0">
                <h2 className="text-[32px] font-normal text-greyscale-800">
                  {title}
                </h2>
                <IconButton icon={X} variant="secondary" onClick={onClose} />
              </div>
              <p className="text-greyscale-800 font-light mb-8 text-[14px]">
                {subtitle}
              </p>
            </div>
            <div className="overflow-y-auto pr-6 flex-1 min-h-0">
              {children}
            </div>

            <div className="flex gap-4 pt-8 flex-shrink-0">
              <Button variant="secondary" label="Annuler" onClick={onClose} />
              <Button
                variant="primary"
                label="Valider"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
