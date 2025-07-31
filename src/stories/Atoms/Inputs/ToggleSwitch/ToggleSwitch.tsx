import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  FormGroup,
  Switch,
  SwitchProps,
} from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

type CustomSwitchPropsType = {
  label: string;
  register?: UseFormRegisterReturn;
  value: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange?: () => void;
  
  size?: "small" | "medium" | "large" | "extralarge";
  direction?: "left" | "right";
  justify?: "space-between" | "start";
};

const SWITCH_CONFIG = {
  small: {
    width: 30,
    height: 14,
    thumb: 10,
    trackTranslate: 16,
    fontSize: "12px",
  },
  medium: {
    width: 36,
    height: 18,
    thumb: 14,
    trackTranslate: 18,
    fontSize: "14px",
  },
  large: {
    width: 36,
    height: 18,
    thumb: 14,
    trackTranslate: 18,
    fontSize: "16px",
  },
  extralarge: {
    width: 36,
    height: 18,
    thumb: 14,
    trackTranslate: 18,
    fontSize: "18px",
  },
};

const IOSSwitch = (config: { width: number; height: number; thumb: number; trackTranslate: number }) =>
  styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(() => ({
    width: `${config.width}px`,
    height: `${config.height}px`,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: (config.height - config.thumb) / 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: `translateX(${config.trackTranslate}px)`,
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
      width: `${config.thumb}px`,
      height: `${config.thumb}px`,
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
  error = false,
  disabled = false,
  onChange,
  size = "medium",
  direction = "right",
  justify = "start",
}: CustomSwitchPropsType) {
  const { fontSize, ...switchConfig } = SWITCH_CONFIG[size];
  const fontWeight = value ? 500 : 300;
  const fontColor = error ? "#E01F22" : disabled ? "#E3DFDA" : "#3C3A37";
  const StyledSwitch = IOSSwitch(switchConfig);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!disabled && onChange) {
      onChange();
    }
  };
  
  return (
    <FormGroup>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: justify,
          flexDirection: direction === "left" ? "row-reverse" : "row",
          gap: 1,
          width: "fit-content"
         }}
        onClick={handleClick}
        >
        <Typography
          sx={{
            fontFamily: "Fustat",
            fontSize,
            fontWeight,
            color: fontColor,
            cursor: disabled ? "not-allowed" : "pointer"
                       }}
        >
          {label}
        </Typography>
        <StyledSwitch
          {...register}
          checked={value}
          disabled={disabled}
          size="small"
          onClick={(e) => e.stopPropagation()}
          onChange={disabled ? undefined : onChange}
        />
      </Box>
    </FormGroup>
  );
}