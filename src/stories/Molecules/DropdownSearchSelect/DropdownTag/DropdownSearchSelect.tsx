import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import { Box, Typography } from "@mui/material";
import { DropdownItem } from "../../../Atoms/Buttons/DropdownItem/DropdownItem";
import { SearchBar } from "../../../Atoms/Inputs/SearchBar/SearchBar";
import { useEffect, useState, useRef } from "react";

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

export const DropdownSearchSelect = ({
  label = "Label",
  options = [],
  placeholder = "Placeholder",
  disabled = false,
  error = false,
  onSelectionChange,
  multiSelect = true,
  maxHeight = 200,
}: DropdownTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<
    DropdownOption[]
  >([]);
  const [searchValue, setSearchValue] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchValue("");
    }
  }, [isOpen]);
  const handleOptionClick = (option: DropdownOption) => {
    let newSelection: DropdownOption[];

    if (multiSelect) {
      const isSelected = selectedOptions.some(
        (selected) => selected.id === option.id
      );
      newSelection = isSelected
        ? selectedOptions.filter((selected) => selected.id !== option.id)
        : [...selectedOptions, option];
    } else {
      newSelection = [option];
      setIsOpen(false);
    }

    setSelectedOptions(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const removeTag = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelection = selectedOptions.filter(
      (selected) => selected.id !== optionId
    );
    setSelectedOptions(newSelection);
    onSelectionChange?.(newSelection);
  };

  const hasSelection = selectedOptions.length > 0;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getFilteredOptions = () => {
    if (searchValue) return filteredOptions;
    else return options;
  };

  const getContainerStateStyles = () => {
    if (disabled) {
      return "text-[#D4D0CB] cursor-not-allowed bg-[#F7F5F3] border-[#F7F5F3]";
    }
    if (error) {
      return "border-[#F03538] text-[#251F19]";
    }
    return hasSelection
      ? "text-[#251F19] border-[#696663]"
      : isOpen
      ? "text-[#A29D98] border-[#2D2A27]"
      : "";
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
    return error
      ? "bg-[#F7F5F3] text-[#F03538]"
      : "bg-[#F7F5F3] text-[#3C3A37]";
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
          fontSize: "12px",
        }}
      >
        {label}
      </Typography>

      <div className="relative inline-block w-[220px]" ref={dropdownRef}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`h-[40px] w-full flex items-center cursor-pointer overflow-hidden border rounded-[8px] font-light text-[12px] text-greyscale-800 ${getContainerStateStyles()} ${getContainerInteractionStyles()} ${getContainerOpenStyles()}`}
        >
          <div className="flex gap-1 flex-1 min-w-0 overflow-x-auto scrollbar-hide pl-3 py-[14px]">
            {selectedOptions.map((selected) => (
              <div
                key={selected.id}
                className={`flex items-center gap-1 rounded-[8px] p-[6px] flex-shrink-0 whitespace-nowrap ${getTagVariantStyles()}`}
              >
                <span>{selected.label}</span>
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
              className="absolute z-50 w-full mt-1 bg-white border border-[#2D2A27] rounded-[8px] shadow-lg"
              style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
            >
              <div className="p-2">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Rechercher..."
                  displayLabel={false}
                />
              </div>
              {options.length === 0 || filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-[#A29D98] text-[12px] font-light">
                  Aucune option disponible
                </div>
              ) : (
                getFilteredOptions().map((option) => {
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
