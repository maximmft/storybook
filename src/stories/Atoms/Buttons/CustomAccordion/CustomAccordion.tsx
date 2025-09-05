import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { useState, useRef, useLayoutEffect } from "react";

type RenderableElementType = React.ReactNode | React.JSX.Element;

type AccordionCustomIconType = {
  active?: RenderableElementType;
  inactive?: RenderableElementType;
};

type AccordionSizeType = "small" | "medium";

type CustomAccordionPropsType = {
  title: string | RenderableElementType;
  subtitle?: string | RenderableElementType;
  children: RenderableElementType;
  icon?: RenderableElementType;
  customIcon?: AccordionCustomIconType;
  contentClassname?: string;
  initiallyOpen?: boolean;
  disabled?: boolean;
  isActive?: boolean;
  showIconBorder?: boolean;
  size?: AccordionSizeType;
};

export default function CustomAccordion({
  children,
  ...props
}: CustomAccordionPropsType) {
  const {
    title,
    subtitle,
    icon,
    disabled = false,
    contentClassname,
    isActive = false,
    showIconBorder = true,
    size = "medium",
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(props.initiallyOpen || false);
  const [accordionHeight, setAccordionHeight] = useState<number>(0);
  const accordionRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (accordionRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (isOpen && accordionRef.current) {
          setAccordionHeight(accordionRef.current.scrollHeight);
        }
      });

      resizeObserver.observe(accordionRef.current);
      Array.from(accordionRef.current.children).forEach((child) => {
        resizeObserver.observe(child);
      });

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isOpen, children]);

  const accordionOnClick = () => {
    if (!disabled) {
      const newActive = !isOpen;
      if (accordionRef.current !== null) {
        if (newActive === false) {
          setAccordionHeight(0);
        } else {
          setAccordionHeight(accordionRef.current.scrollHeight);
        }
      }
      setIsOpen(newActive);
    }
  };

  const displayIconComponent = () => {
    if (props.customIcon === undefined) {
      return isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />;
    } else {
      return isOpen ? props.customIcon.active : props.customIcon.inactive;
    }
  };

  const getPaddingClasses = () => {
    return size === "small" ? "p-3" : "p-6";
  };

  const getContentPaddingClasses = () => {
    return size === "small" ? "px-4 pb-2" : "px-6 pb-6";
  };

  return (
    <div
      className={`w-full rounded-[8px] transition-colors duration-200 ${
        isActive
          ? "bg-greyscale-100 border-greyscale-600"
          : "border-greyscale-400"
      } ${
        disabled
          ? ""
          : !isOpen
          ? "hover:bg-greyscale-200 active:border-greyscale-900"
          : ""
      }`}
    >
      <button
        onClick={accordionOnClick}
        disabled={disabled}
        className={`w-full ${getPaddingClasses()} flex items-center justify-between text-left group ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <div className="flex items-start gap-2 flex-1">
          <div
            className={`${
              disabled ? "text-greyscale-500" : "text-greyscale-800"
            } mt-1 flex-shrink-0`}
          >
            {icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`${
                disabled ? "text-greyscale-500" : "text-gray-900"
              } font-normal mb-1`}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                className={`${
                  disabled ? "text-greyscale-500" : "text-greyscale-700"
                } text-[10px] font-thin`}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex justify-center items-center ${
            disabled ? "text-greyscale-500" : "text-primary-800"
          } ml-4 flex-shrink-0 w-10 h-10 rounded-full transition-transform duration-200 ${
            showIconBorder
              ? disabled
                ? "border border-greyscale-500"
                : "border border-primary-800"
              : ""
          }`}
        >
          {displayIconComponent()}
        </div>
      </button>
      <div
        ref={accordionRef}
        style={{ maxHeight: accordionHeight }}
        className={`transition-all duration-300 ease-in-out ${isOpen ? "" :"overflow-hidden"} ${contentClassname}`}
      >
        <div className={getContentPaddingClasses()}>{children}</div>
      </div>
    </div>
  );
}