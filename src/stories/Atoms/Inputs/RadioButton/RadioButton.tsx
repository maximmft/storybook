import React from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";

type RadioOptionsType = {
  id: string;
  label: string;
};

type RadioButtonPropsType = {
  options: RadioOptionsType[];
};

// Icones personnalisées
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

const StyledFormControlLabel = styled(FormControlLabel)<{ checked?: boolean }>(
  ({ checked }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "12px",
      fontWeight: checked ? 400 : 300,
      color: "#2D2A27",
    },
    "&:hover .MuiFormControlLabel-label": {
      fontWeight: 400,
      cursor: "pointer",
    },
  })
);

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

export default function RadioButton({ options }: RadioButtonPropsType) {
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup value={selectedValue} onChange={handleChange}>
        {options.map((option) => (
          <StyledFormControlLabel
            key={option.id}
            value={option.id}
            control={<BpRadio />}
            label={option.label}
            checked={selectedValue === option.id}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
