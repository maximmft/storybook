import { ReactElement } from "react";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import Feedback from "src/stories/Atoms/Informations/Feedback/Feedback";

type FeedbackModalPropsType = {
  children?: ReactElement;
  isOpen: boolean;
  onClose: () => void;
  typeModal: "question" | "warning" | "published" | "mail";
  title: string | ReactElement;
  subtitle?: string;
  onSubmit?: () => void;
  maxHeight: string;
  maxWidth: string;
};

export const FeedbackModal = ({
  children,
  isOpen,
  onClose,
  subtitle,
  title,
  typeModal,
  onSubmit,
  maxWidth,
  maxHeight,
}: FeedbackModalPropsType) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-20 z-[9998]" onClick={onClose} />
          
          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
            <div
              className="bg-white border p-6 border-greyscale-400 rounded-lg w-full shadow-2xl flex flex-col pointer-events-auto"
              style={{
                maxWidth: maxWidth,
                maxHeight: maxHeight,
              }}
            >
              <div className="flex flex-col gap-2 items-center">
                <Feedback type={typeModal} variant="modale" />
                <div className="flex items-center justify-center flex-shrink-0">
                  <h2 className="text-[20px] font-normal text-center text-[#0B0B0B]">
                    {title}
                  </h2>
                </div>
                {subtitle && <p className="text-[#0B0B0B] font-light text-[14px]">
                  {subtitle}
                </p>}
              </div>
              
              {children && (
                <div className="flex-1 min-h-0 mt-8">{children}</div>
              )}
              
              <div className="flex gap-4 pt-8 flex-shrink-0">
                <Button variant="secondary" label="Annuler" onClick={onClose} />
                <Button variant="primary" label="Valider" onClick={onSubmit} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};