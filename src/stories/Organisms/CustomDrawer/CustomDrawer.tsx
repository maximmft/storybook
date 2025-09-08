import { ArrowLeft } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";

export interface CustomDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: ReactElement | string;
  width?: string;
  children: ReactNode;
  footer?: ReactNode;
  headerTag?: ReactNode;
  position?: "left" | "right";
}

export const CustomDrawer = ({
  isOpen,
  setIsOpen,
  title,
  width = "483px",
  children,
  position = "right",
  headerTag,
  footer,
}: CustomDrawerProps) => {
  const positionClassName =
    position === "right" ? "rounded-l-lg right-0" : "rounded-r-lg left-0";

  const getTransformClass = (position: "left" | "right") => {
    if (position === "right") {
      return isOpen ? "-translate-x-0" : "translate-x-full";
    } else {
      return isOpen ? "translate-x-0" : "-translate-x-full";
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-200 z-40 ${
          isOpen ? "opacity-15" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <main
        className={`fixed  top-0 p-8 bg-white  flex flex-col h-screen transition-transform duration-200 z-50  ${positionClassName} ${getTransformClass(
          position
        )}`}
        style={{ width }}
      >
        <div className="flex flex-row items-center mb-6">
          <IconButton
            icon={ArrowLeft}
            variant="tertiary"
            onClick={() => setIsOpen(false)}
          />
          {title && <p className="text-[20px] font-light mr-3">{title}</p>}
          {headerTag}
        </div>

        <section className="flex-1 overflow-auto pr-4 mb-8">{children}</section>

        {footer && (
          <div className="pt-8 px-8 flex flex-col items-center gap-4 shadow-[0_-16px_28px_-20px_rgba(0,0,0,0.1)]">
            {footer}
          </div>
        )}
      </main>
    </>
  );
};
