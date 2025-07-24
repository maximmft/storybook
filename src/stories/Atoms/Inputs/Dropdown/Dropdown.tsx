import * as React from "react";
import { ChevronDown } from "lucide-react";
import { DropdownItem } from "../../Buttons/DropdownItem/DropdownItem";

type DropdownOption = {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  variant?: "default" | "checkbox";
};

type DropdownItemProps = {
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  onSelectionChange?: (selectedOptions: DropdownOption[]) => void;
  multiSelect?: boolean;
  maxHeight?: number;
};

export const Dropdown = ({
  options = [],
  placeholder = "Sélectionner une option",
  disabled = false,
  onSelectionChange,
  multiSelect = false,
  maxHeight = 200,
}: DropdownItemProps) => {
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

  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length === 1) return selectedOptions[0].label;
    return `${selectedOptions.length} éléments sélectionnés`;
  };

  const hasSelection = selectedOptions.length > 0;

  return (
    <div className="relative inline-block min-w-[220px] w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          h-10 px-3 w-full min-w-[200px] flex items-center justify-between
          border rounded-lg bg-white font-light text-[14px] leading-[20px]
          ${disabled 
            ? "text-[#D4D0CB] cursor-not-allowed bg-[#F7F5F3] border-[#F7F5F3]" 
            : `${hasSelection ? "text-[#251F19] border-[#696663]" : "text-[#A29D98] border-[#E3DFDA]"} hover:border-[#696663] focus:outline-none focus:ring-1 focus:ring-[#2D2A27] focus:border-[#2D2A27]`
          }
          ${isOpen ? "border-[#2D2A27] ring-1 ring-[#2D2A27]" : ""}
        `}
      >
        <span className="truncate text-left flex-1">
          {getDisplayText()}
        </span>
        <ChevronDown 
            className={`w-4 h-4 transition-transform ml-auto ${isOpen ? "rotate-180" : ""} ${disabled ? "text-[#D4D0CB]" : ""}`}
          />
      </button>

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