import React from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { UseFormRegisterReturn } from "react-hook-form";

const BpIcon = styled("span")(() => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow: "inset 0 0 0 1px #E3DFDA",
  backgroundColor: "#FFFFFF",
  "input:hover ~ &": {
    backgroundColor: "#F7F5F3",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#F7F5F3",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&::before": {
    display: "flex",
    width: 11,
    height: 11,
    backgroundColor: "#000000",
    borderRadius: "50%",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#F7F5F3",
  },
});

const fontSize = {
  small: 12,
  medium: 14,
  large: 16,
};

const lineHeight = {
  small: 16,
  medium: 16,
  large: 16,
};

const StyledFormControlLabel = styled(FormControlLabel)<{
  checked?: boolean;
  size?: "small" | "medium" | "large";
}>(({ checked, size = "small" }) => ({
  margin: 0,
  alignItems: "center",
  "& .MuiFormControlLabel-label": {
    fontSize: fontSize[size] ?? 12,
    fontWeight: checked ? 400 : 300,
    color: "#2D2A27",
    lineHeight: `${lineHeight[size]}px`,
    display: "flex",
    alignItems: "center",
  },
  "&:hover .MuiFormControlLabel-label": {
    fontWeight: 400,
    cursor: "pointer",
  },
  "& .MuiRadio-root": {
    padding: 0,
    marginRight: 8,
  },
}));

function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

type RadioButtonPropsType = {
  id: string;
  label: string;
  checked?: boolean; 
  register?: UseFormRegisterReturn;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  size?: "small" | "medium" | "large";
};

export default function RadioButton({
  id,
  label,
  checked,
  onChange,
  register,
  value,
  size = "small",
}: RadioButtonPropsType) {
  return (
    <StyledFormControlLabel
      control={
        <BpRadio 
          id={id} 
          checked={checked} 
          onChange={onChange} 
          value={value}
          {...register} 
        />
      }
      label={label}
      checked={checked}
      size={size}
    />
  );
}