import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DropdownItem } from "../Dropdown/DropdownItem.tsx";

interface SelectOption {
  name: string;
  value: string;
  icon?: React.ComponentType<any>;
  disabled?: boolean;
}

interface SelectButtonProps {
  size?: "small" | "medium" | "large";
  label: string;
  icon?: React.ComponentType<any>;
  onClick?: () => void;
  options: SelectOption[];
  disabled?: boolean;
  multiple?: boolean;
  variant?: "default" | "checkbox";
  onSelectionChange?: (selected: string | string[]) => void;
}

export const SelectButton = ({
  size = "medium",
  label,
  options = [],
  icon: IconComponent,
  onClick,
  disabled = false,
  multiple = false,
  variant = "default",
  onSelectionChange,
  ...props
}: SelectButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (onClick) {
        onClick();
      }
    }
  };

  const handleItemSelect = (value: string) => {
    let newSelection: string[];

    if (multiple) {
      if (selectedValues.includes(value)) {
        newSelection = selectedValues.filter((v) => v !== value);
      } else {
        newSelection = [...selectedValues, value];
      }
    } else {
      newSelection = [value];
      setIsOpen(false);
    }

    setSelectedValues(newSelection);

    if (onSelectionChange) {
      onSelectionChange(multiple ? newSelection : newSelection[0] || "");
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return label;
    }
    if (multiple) {
      return `${label} (${selectedValues.length})`;
    }
    const selectedOption = options.find(
      (opt) => opt.value === selectedValues[0]
    );
    return selectedOption ? selectedOption.name : label;
  };

  const hasSelection = selectedValues.length > 0;

  const buttonClasses = `
    flex items-center justify-between min-w-[130px] px-3 py-2 
    border rounded-lg text-sm font-medium transition-colors
    ${
      disabled
        ? "bg-transparent text-gray-300 border-gray-200 cursor-not-allowed"
        : hasSelection
        ? "border-gray-600 text-gray-900"
        : "border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
    }
    ${isOpen ? "bg-gray-50 border-gray-600" : ""}
  `;

  return (
    <div className="relative" onBlur={() => setIsOpen(false)} tabIndex={-1}>
      {" "}
      <div className={buttonClasses} onClick={handleToggle}>
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent size={16} />}
          <span>{getDisplayText()}</span>
        </div>
        <KeyboardArrowDownIcon
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-full">
          {options.map((option, index) => (
            <DropdownItem
              key={option.value || index}
              label={option.name}
              icon={option.icon}
              disabled={option.disabled}
              variant={multiple ? "checkbox" : "default"}
              isActive={selectedValues.includes(option.value)}
              checked={
                multiple ? selectedValues.includes(option.value) : undefined
              }
              onCheckChange={
                multiple ? () => handleItemSelect(option.value) : undefined
              }
              onClick={
                !multiple ? () => handleItemSelect(option.value) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
