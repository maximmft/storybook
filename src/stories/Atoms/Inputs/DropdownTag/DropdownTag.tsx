import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { DropdownItem } from "../../Buttons/DropdownItem/DropdownItem";
import { Box, Typography } from "@mui/material";

type DropdownOption = {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  variant?: "default" | "checkbox";
};

type DropdownTagProps = {
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onSelectionChange?: (selectedOptions: DropdownOption[]) => void;
  multiSelect?: boolean;
  maxHeight?: number;
};

export const DropdownTag = ({
  label = "Label",
  options = [],
  placeholder = "Placeholder",
  disabled = false,
  error = false,
  onSelectionChange,
  multiSelect = true,
  maxHeight = 200,
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

  const getContainerBaseStyles = () => "h-[40px] w-full flex items-center cursor-pointer overflow-hidden border rounded-[8px] font-light text-[12px] text-greyscale-800";
  
  const getContainerStateStyles = () => {
    if (disabled) {
      return "text-[#D4D0CB] cursor-not-allowed bg-[#F7F5F3] border-[#F7F5F3]";
    }
    
    if (error) {
      return "border-[#F03538] text-[#251F19]";
    }
    
    return hasSelection 
      ? "text-[#251F19] border-[#696663]" 
      : "text-[#A29D98] border-[#E3DFDA]";
  };

  const getContainerInteractionStyles = () => {
    if (disabled || error) return "";
    return "hover:border-[#696663]";
  };

  const getContainerOpenStyles = () => {
    if (!isOpen) return "";
    return error ? "border-[#F03538]" : "border-[#2D2A27]";
  };

  const getTagsContainerStyles = () => "flex gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-hide pl-3 py-[14px]";

  const getTagBaseStyles = () => "flex items-center gap-1 rounded-[8px] p-[6px] flex-shrink-0 whitespace-nowrap";
  
  const getTagVariantStyles = () => {
    return error ? "bg-[#F7F5F3] text-[#F03538]" : "bg-[#F7F5F3] text-[#3C3A37]";
  };

  const getTagRemoveButtonStyles = () => "hover:bg-black/10 rounded-sm p-0.5 transition-colors";

  const getPlaceholderStyles = () => "text-[#A29D98] truncate py-1";

  const getChevronStyles = () => {
    const baseStyles = "w-4 h-4 mx-2 transition-transform";
    const rotationStyle = isOpen ? "rotate-180" : "";
    
    let colorStyle = "";
    if (disabled) colorStyle = "text-[#D4D0CB]";
    else if (error) colorStyle = "text-[#F03538]";
    
    return `${baseStyles} ${rotationStyle} ${colorStyle}`.trim();
  };

  const getDropdownStyles = () => "absolute z-50 w-full mt-1 bg-white border border-[#E3DFDA] rounded-[8px] shadow-lg";
  
  const getEmptyMessageStyles = () => "px-3 py-2 text-[#A29D98] text-[12px] font-light";

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: error ? "#F03538" : disabled ? "#D4D0CB" : "#2D2A27",
          fontWeight: 400,
          fontSize: '12px'
        }}
      >
        {label}
      </Typography>

      <div className="relative inline-block w-[220px]" ref={dropdownRef}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`${getContainerBaseStyles()} ${getContainerStateStyles()} ${getContainerInteractionStyles()} ${getContainerOpenStyles()}`}
        >
          <div className={getTagsContainerStyles()}>
            {selectedOptions.map((selected) => (
              <div
                key={selected.id}
                className={`${getTagBaseStyles()} ${getTagVariantStyles()}`}
              >
                <span>{selected.label}</span>
                {!disabled && (
                  <button
                    onClick={(e) => removeTag(selected.id, e)}
                    className={getTagRemoveButtonStyles()}
                    type="button"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            ))}
            
            {selectedOptions.length === 0 && (
              <span className={getPlaceholderStyles()}>{placeholder}</span>
            )}
          </div>

          <ChevronDown className={getChevronStyles()} />
        </div>

        {isOpen && (
          <div 
            className={getDropdownStyles()}
            style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
          >
            {options.length === 0 ? (
              <div className={getEmptyMessageStyles()}>
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
                    onCheckChange={multiSelect ? () => handleOptionClick(option) : undefined}
                  />
                );
              })
            )}
          </div>
        )}
      </div>
    </Box>
  );
};