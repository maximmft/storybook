import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, FormGroup, Switch, SwitchProps } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

type CustomSwitchPropsType = {
  label: string;
  register?: UseFormRegisterReturn;
  value: boolean;
  disabled?: boolean;
  size?: "small" | "medium";
};

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: 48,
  height: 20,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(28px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#251F19",
        opacity: 1,
        border: 0,
      },
    },
    "&.Mui-disabled": {
      "& + .MuiSwitch-track": {
        backgroundColor: "#EFECE9 !important",
        opacity: 1,
      },
    },
    "&:hover:not(.Mui-disabled) + .MuiSwitch-track": {
      backgroundColor: "#A29D98",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 16,
    height: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: "2px",
    boxShadow: "none",
  },
  "& .MuiSwitch-track": {
    borderRadius: "2px",
    backgroundColor: "#E9E9EA",
    opacity: 1,
  },
}));

export default function ToggleSwitch({
  label,
  register,
  value,
  disabled = false,
  size = "medium",
}: CustomSwitchPropsType) {
  const fontSize = size === "small" ? "14px" : "16px";
  const fontWeight = value ? 500 : 300;
  const fontColor = disabled ? "#E3DFDA" : "#3C3A37";

  return (
    <FormGroup>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Fustat",
            fontSize,
            fontWeight,
            color: fontColor,
          }}
        >
          {label}
        </Typography>
        <IOSSwitch
          {...register}
          checked={value}
          disabled={disabled}
          size="small"
        />
      </Box>
    </FormGroup>
  );
}
