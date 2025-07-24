import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  label: string;
  icon: React.ComponentType<any>;
  onClick?: () => void;
  options: { name: string; value: string }[];
  disabled?: boolean;
  multiple?: boolean;
}

export const FilterButton = ({
  size = "medium",
  label,
  options = [],
  icon: IconComponent,
  onClick,
  disabled = false,
  multiple = false,
  ...props
}: ButtonProps) => {
  const [value, setValue] = React.useState<string | string[]>(
    multiple ? [] : ""
  );

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    setValue(event.target.value);
  };

  const renderValue = (selected: string | string[]) => {
    if (multiple && Array.isArray(selected)) {
      return selected.length > 0 ? `${label} (${selected.length})` : label;
    }
    return selected || label;
  };

  const hasSelection = () => {
    if (multiple) {
      return Array.isArray(value) && value.length > 0;
    }
    return Boolean(value);
  };

  const selectStyles = {
    "& .MuiSelect-icon": {
      width: "20px",
      position: "relative",
      zIndex: 1,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: hasSelection() ? "#696663" : "#D4D0CB",
      borderWidth: "1px",
      borderRadius: "8px",
    },

    "&:hover": {
      backgroundColor: "#F7F5F3",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D4D0CB",
        borderWidth: "1px",
      },
      "& .MuiSelect-icon": {
        opacity: 1,
        visibility: "visible",
      },
    },

   "&.Mui-focused": {
      backgroundColor: "#F7F5F3",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#696663",
        borderWidth: "1px",
      },
    },

    "&.Mui-disabled": {
      backgroundColor: "transparent",
      color: "#E3DFDA",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E3DFDA",
        borderWidth: "1px",
      },
      "& .MuiSelect-icon": {
        color: "#E3DFDA",
      },
    },
  };

  const menuProps = {
    PaperProps: {
      sx: {
        backgroundColor: "#F7F5F3",
      },
    },
  };

  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth disabled={disabled}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          multiple={multiple}
          displayEmpty
          renderValue={renderValue}
          IconComponent={KeyboardArrowDownIcon}
          sx={selectStyles}
          MenuProps={menuProps}
        >
          {options.map((option, index) => (
            <MenuItem key={option.value || index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
