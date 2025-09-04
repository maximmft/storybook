import * as React from "react";
import { ChevronDown } from "lucide-react";
import { DropdownItem } from "../../Buttons/DropdownItem/DropdownItem";
import { Box, Typography } from "@mui/material";
import { UseFormRegisterReturn, UseFormWatch } from "react-hook-form";

export type DropdownOption = {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  iconPosition?: "right" | "left";
  disabled?: boolean;
  variant?: "default" | "checkbox";
};

type DropdownPropsType = {
  label: string;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  multiSelect?: boolean;
  maxHeight?: number;
  size?: "small" | "medium" | "large";
  required?: boolean;
  register?: UseFormRegisterReturn;
  fieldName?: string;
  watch?: UseFormWatch<any>;
};

const fontSize = {
  small: "12px",
  medium: "14px",
  large: "16px",
};

export const Dropdown = ({
  label = "Label",
  options = [],
  placeholder = "Sélectionner une option",
  disabled = false,
  error = false,
  size = "medium",
  required = false,
  multiSelect = false,
  maxHeight = 200,
  register,
  fieldName,
  watch,
}: DropdownPropsType) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const fieldValue = watch && fieldName ? watch(fieldName) : undefined;

  const getSelectedOptionsFromValue = React.useMemo(() => {
    if (!fieldValue) return [];

    if (multiSelect) {
      const valueArray = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
      return options.filter((option) => valueArray.includes(option.id));
    } else {
      const singleValue = Array.isArray(fieldValue)
        ? fieldValue[0]
        : fieldValue;
      return options.filter((option) => option.id === singleValue);
    }
  }, [fieldValue, options, multiSelect]);

  const selectedOptions = getSelectedOptionsFromValue;

  const handleOptionClick = React.useCallback((option: DropdownOption) => {
    if (option.disabled) return;

    let newValue: string | string[];

    if (multiSelect) {
      const isSelected = selectedOptions.some(
        (selected) => selected.id === option.id
      );
      const newSelection = isSelected
        ? selectedOptions.filter((selected) => selected.id !== option.id)
        : [...selectedOptions, option];
      newValue = newSelection.map((opt) => opt.id);
    } else {
      newValue = option.id;
      // Fermer le dropdown pour single select
      setIsOpen(false);
    }

    // Mettre à jour le formulaire via react-hook-form uniquement
    if (register?.onChange) {
      register.onChange({
        target: {
          name: register.name,
          value: newValue,
        },
      });
    }
  }, [selectedOptions, multiSelect, register]);

  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length === 1) return selectedOptions[0].label;
    return `${selectedOptions.length} éléments sélectionnés`;
  };

  const hasSelection = selectedOptions.length > 0;

  const getButtonStateStyles = () => {
    if (disabled) {
      return "text-[#D4D0CB] cursor-not-allowed bg-[#F7F5F3] border-[#F7F5F3]";
    }
    if (error) {
      return "border-[#F03538] hover:border-[#F03538] focus:outline-none focus:ring-1 focus:ring-[#F03538] focus:border-[#F03538]";
    }
    const baseColor = hasSelection
      ? "text-[#251F19] border-[#696663]"
      : "text-[#A29D98] border-[#E3DFDA]";
    return `${baseColor} hover:border-[#696663] focus:outline-none focus:ring-1 focus:ring-[#2D2A27] focus:border-[#2D2A27]`;
  };

  const getButtonOpenStyles = () => {
    if (!isOpen) return "";
    return error
      ? "border-[#F03538] ring-1 ring-[#F03538]"
      : "border-[#2D2A27] ring-1 ring-[#2D2A27]";
  };

  const getTextStyles = () => {
    return !hasSelection
      ? `truncate text-left flex-1 text-[#A29D98]`
      : "truncate text-left flex-1";
  };

  const getChevronStyles = () => {
    const rotationStyle = isOpen ? "rotate-180" : "";
    let colorStyle = "";
    if (disabled) colorStyle = "text-[#D4D0CB]";
    else if (error) colorStyle = "text-[#F03538]";

    return `w-4 h-4 transition-transform ml-auto ${rotationStyle} ${colorStyle}`.trim();
  };

  // Fermer le dropdown si on clique à l'extérieur
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: error ? "#F03538" : disabled ? "#D4D0CB" : "#2D2A27",
          fontWeight: 400,
          fontSize: fontSize[size],
        }}
      >
        {label}
        {required && <span className="text-[#F03538] ml-1">*</span>}
      </Typography>

      <div className="relative inline-block w-full" ref={dropdownRef}>
        {register && (
          <input
            {...register}
            type="hidden"
            value={multiSelect ? JSON.stringify(fieldValue || []) : (fieldValue || '')}
          />
        )}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`h-12 px-3 w-full flex items-center justify-between border rounded-lg bg-white font-light text-[14px] leading-[20px] ${getButtonStateStyles()} ${getButtonOpenStyles()}`}
        >
          <span className={getTextStyles()}>{getDisplayText()}</span>
          <ChevronDown className={getChevronStyles()} />
        </button>

        {isOpen && (
          <div
            className="absolute z-[99999] w-full mt-1 bg-white border border-[#E3DFDA] rounded-lg shadow-lg"
            style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
          >
            {options.length === 0 ? (
              <div className="px-3 py-2 text-[#A29D98] text-sm font-light">
                Aucune option disponible
              </div>
            ) : (
              options.map((option) => {
                const isSelected = selectedOptions.some(
                  (selected) => selected.id === option.id
                );

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