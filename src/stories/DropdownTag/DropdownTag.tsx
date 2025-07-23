import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { DropdownItem } from "../DropdownItem/DropdownItem.tsx";

type DropdownOption = {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  variant?: "default" | "checkbox";
};

type DropdownTagProps = {
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  onSelectionChange?: (selectedOptions: DropdownOption[]) => void;
  multiSelect?: boolean;
  maxHeight?: number;
  variant?: "default" | "error";
};

export const DropdownTag = ({
  options = [],
  placeholder = "Placeholder",
  disabled = false,
  onSelectionChange,
  multiSelect = true,
  maxHeight = 200,
  variant = "default",
}: DropdownTagProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<DropdownOption[]>([]);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: DropdownOption) => {
    let newSelection: DropdownOption[];

    if (multiSelect) {
      const isSelected = selectedOptions.some(selected => selected.id === option.id);
      newSelection = isSelected 
        ? selectedOptions.filter(selected => selected.id !== option.id)
        : [...selectedOptions, option];
    } else {
      newSelection = [option];
      setIsOpen(false);
    }

    setSelectedOptions(newSelection);
    onSelectionChange?.(newSelection);
  };

  const removeTag = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = selectedOptions.filter(selected => selected.id !== optionId);
    setSelectedOptions(newSelection);
    onSelectionChange?.(newSelection);
  };

  const hasSelection = selectedOptions.length > 0;

  const getVariantStyles = () => {
    if (disabled) {
      return "text-[#D4D0CB] cursor-not-allowed bg-[#F7F5F3] border-[#F7F5F3]";
    }
    
    if (variant === "error") {
      return "border-[#F03538] text-[#251F19]";
    }
    
    return hasSelection 
      ? "text-[#251F19] border-[#696663]" 
      : "text-[#A29D98] border-[#E3DFDA]";
  };

  const getTagVariantStyles = () => {
    if (variant === "error") {
      return "bg-[#F7F5F3] text-[#F03538]";
    }
    
    return "bg-[#F7F5F3] text-[#3C3A37]";
  };

  return (
    <div className="relative inline-block w-[220px]" ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          h-[40px] px-2 w-full flex items-center gap-2 cursor-pointer overflow-hidden
          border rounded-lg bg-white font-light text-[14px] leading-[20px]
          ${getVariantStyles()}
          ${!disabled && variant !== "error" ? "hover:border-[#696663] focus:outline-none focus:ring-1 focus:ring-[#2D2A27] focus:border-[#2D2A27]" : ""}
          ${isOpen && variant !== "error" ? "border-[#2D2A27] ring-1 ring-[#2D2A27]" : ""}
        `}
      >
        <div className="flex gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-hide">
          {selectedOptions.map((selected) => (
            <div
              key={selected.id}
              className={`
                flex items-center gap-1 px-2 py-1 rounded-md text-xs flex-shrink-0 whitespace-nowrap
                ${getTagVariantStyles()}
              `}
            >
              <span>{selected.label}</span>
              {!disabled && (
                <button
                  onClick={(e) => removeTag(selected.id, e)}
                  className="hover:bg-black/10 rounded-sm p-0.5 transition-colors"
                  type="button"
                >
                 <X size={10}/>
                 
                </button>
              )}
            </div>
          ))}
          
          {selectedOptions.length === 0 && (
            <span className="text-[#A29D98] truncate py-1">{placeholder}</span>
          )}
        </div>

        <ChevronDown 
          className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""} ${disabled ? "text-[#D4D0CB]" : ""}`}
        />
      </div>

      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border border-[#E3DFDA] rounded-lg shadow-lg"
          style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-[#A29D98] text-sm font-light">
              Aucune option disponible
            </div>
          ) : (
            options.map((option) => {
              const isSelected = selectedOptions.some(selected => selected.id === option.id);
              
              return (
                <DropdownItem
                  key={option.id}
                  label={option.label}
                  icon={option.icon}
                  iconPosition={option.iconPosition}
                  disabled={option.disabled}
                  isActive={!multiSelect && isSelected}
                  variant={option.variant || (multiSelect ? "checkbox" : "default")}
                  checked={multiSelect ? isSelected : undefined}
                  onClick={() => handleOptionClick(option)}
                  onCheckChange={multiSelect ? (checked) => handleOptionClick(option) : undefined}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};