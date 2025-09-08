import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { DropdownItem } from "../../Buttons/DropdownItem/DropdownItem";
import { Box, Typography } from "@mui/material";
import { UseFormRegisterReturn, UseFormWatch } from "react-hook-form";

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
  required?: boolean;
  error?: boolean;
  onSelectionChange?: (selectedOptions: DropdownOption[]) => void;
  multiSelect?: boolean;
  maxHeight?: number;
  register?: UseFormRegisterReturn;
  fieldName?: string;
  watch?: UseFormWatch<any>;
  size?: "small" | "medium";
};

export const DropdownTag = ({
  label = "Label",
  options = [],
  placeholder = "Placeholder",
  disabled = false,
  error = false,
  required = false,
  onSelectionChange,
  multiSelect = true,
  maxHeight = 200,
  register,
  fieldName,
  watch,
}: DropdownTagProps) => {
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

  const handleOptionClick = (option: DropdownOption) => {
    let newSelection: DropdownOption[];
    let newValue: string | string[];

    if (multiSelect) {
      const isSelected = selectedOptions.some(
        (selected) => selected.id === option.id
      );
      newSelection = isSelected
        ? selectedOptions.filter((selected) => selected.id !== option.id)
        : [...selectedOptions, option];
      newValue = newSelection.map((opt) => opt.id);
    } else {
      newSelection = [option];
      newValue = option.id;
      setIsOpen(false);
    }

    onSelectionChange?.(newSelection);

    if (register?.onChange) {
      register.onChange({
        target: {
          name: register.name,
          value: newValue,
        },
      });
    }
  };

  const removeTag = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = selectedOptions.filter(
      (selected) => selected.id !== optionId
    );

    const newValue = multiSelect
      ? newSelection.map((opt) => opt.id)
      : newSelection.length > 0
      ? newSelection[0].id
      : "";

    onSelectionChange?.(newSelection);

    if (register?.onChange) {
      register.onChange({
        target: {
          name: register.name,
          value: newValue,
        },
      });
    }
  };

  const hasSelection = selectedOptions.length > 0;

  const getContainerStateStyles = () => {
    if (disabled) {
      return `text-[#D4D0CB] cursor-not-allowed bg-[#F7F5F3] border-[#F7F5F3] h-12 text-sm`;
    }

    if (error) {
      return `border-[#F03538] text-[#251F19] h-12 text-sm`;
    }

    return hasSelection
      ? `text-[#251F19] border-[#696663] h-12 text-sm`
      : `text-[#A29D98] border-[#E3DFDA] h-12 text-sm`;
  };

  const getContainerInteractionStyles = () => {
    if (disabled || error) return "";
    return "hover:border-[#696663]";
  };

  const getContainerOpenStyles = () => {
    if (!isOpen) return "";
    return error ? "border-[#F03538]" : "border-[#2D2A27]";
  };

  const getTagVariantStyles = () => {
    const baseStyles = error
      ? "bg-[#F7F5F3] text-[#F03538]"
      : "bg-[#F7F5F3] text-[#3C3A37]";

    return `${baseStyles} p-[5px]`;
  };

  const getChevronStyles = () => {
    const baseStyles = "w-4 h-4 mx-2 transition-transform";
    const rotationStyle = isOpen ? "rotate-180" : "";

    let colorStyle = "";
    if (disabled) colorStyle = "text-[#D4D0CB]";
    else if (error) colorStyle = "text-[#F03538]";

    return `${baseStyles} ${rotationStyle} ${colorStyle}`.trim();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography
        variant="body2"
        sx={{
          color: error ? "#F03538" : disabled ? "#D4D0CB" : "#2D2A27",
          fontWeight: 400,
          fontSize: "14px",
        }}
      >
        {label} {required && <span className="text-[#F03538]">*</span>}
      </Typography>

      <div className="relative inline-block max-w-[220px]" ref={dropdownRef}>
        {register && (
          <input
            {...register}
            type="hidden"
            value={
              multiSelect ? JSON.stringify(fieldValue || []) : fieldValue || ""
            }
          />
        )}

        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`w-full flex items-center cursor-pointer overflow-hidden border rounded-[8px] font-light text-greyscale-800 ${getContainerStateStyles()} ${getContainerInteractionStyles()} ${getContainerOpenStyles()}`}
        >
          <div className="flex gap-1 flex-1 min-w-0 overflow-x-auto thin-scrollbar pl-3">
            {selectedOptions.map((selected) => (
              <div
                key={selected.id}
                className={`flex items-center gap-1 rounded-[8px] flex-shrink-0 whitespace-nowrap ${getTagVariantStyles()}`}
              >
                <span className="text-[12px]">{selected.label}</span>
                {!disabled && (
                  <button
                    onClick={(e) => removeTag(selected.id, e)}
                    className="hover:bg-black/10 rounded-sm p-0.5 transition-colors"
                    type="button"
                  >
                    <X size={10} />
                  </button>
                )}
              </div>
            ))}

            {selectedOptions.length === 0 && (
              <span className="text-[#A29D98] truncate py-1">
                {placeholder}
              </span>
            )}
          </div>

          <ChevronDown className={getChevronStyles()} />
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsOpen(false)}
            />
            <div
              className="absolute z-50 w-full mt-1 bg-white border border-[#E3DFDA] rounded-[8px] shadow-lg"
              style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
            >
              {options.length === 0 ? (
                <div className="px-3 py-2 text-[#A29D98] text-[12px] font-light">
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
                      variant={
                        option.variant || (multiSelect ? "checkbox" : "default")
                      }
                      checked={multiSelect ? isSelected : undefined}
                      onClick={() => handleOptionClick(option)}
                      onCheckChange={
                        multiSelect
                          ? () => handleOptionClick(option)
                          : undefined
                      }
                    />
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </Box>
  );
};
