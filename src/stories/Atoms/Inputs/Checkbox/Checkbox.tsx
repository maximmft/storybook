import * as React from "react";
import { Checkbox as MuiCheckbox, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
  size?: "small" | "medium";
  onCheckChange?: (checked: boolean) => void;
};

const StyledCheckbox = styled(MuiCheckbox)(({ disabled }) => ({
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
    },
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
  label,
  onCheckChange,
  labelPosition = "right",
  size = "medium",
}: CheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onCheckChange) {
      onCheckChange(event.target.checked);
    }
  };

  const fontSize = size === "small" ? "14px" : "16px";
  const fontWeight = checked ? 400 : 300;
  const fontColor = disabled ? "#E3DFDA" : "#3C3A37";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: labelPosition === "left" ? "row-reverse" : "row",
        gap: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{ fontSize, fontWeight, color: fontColor }}
      >
        {label}
      </Typography>
      <StyledCheckbox
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        disableRipple
        size="small"
      />
    </Box>
  );
};
