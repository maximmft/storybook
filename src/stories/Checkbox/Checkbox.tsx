import * as React from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { styled } from "@mui/material/styles";

type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  onCheckChange?: (checked: boolean) => void;
};

const StyledCheckbox = styled(MuiCheckbox)(({ theme, checked, disabled }) => ({
  width: 16,
  height: 16,
  padding: 0,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.5 : 1,
     
  "& .MuiSvgIcon-root": {
    width: 16,
    height: 16,
    color: "#E3DFDA", 
  },
  
  "&.Mui-checked": {
    color: "#000000", 
    "& .MuiSvgIcon-root": {
      color: "#000000",
    }
  },
  "&:hover": {
    backgroundColor: "#F7F5F3", 
   
  },
  
  "&.Mui-disabled:hover": {
    backgroundColor: "transparent",
  },
     
  "& .MuiTouchRipple-root": {
    display: "none",
  },
}));

export const Checkbox = ({
  checked = false,
  disabled = false,
  onCheckChange,
}: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onCheckChange) {
      onCheckChange(event.target.checked);
    }
  };

  return (
    <StyledCheckbox
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
      disableRipple
      size="small"
    />
  );
};