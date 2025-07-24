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

const StyledFormControlLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    fontSize: '12px',
    fontWeight: 400,
    color: '#2D2A27',
  },
});

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
  return (
    <FormControl>
      <RadioGroup>
        {options.map((option) => (
          <StyledFormControlLabel
            value={option.id}
            key={option.id}
            control={<BpRadio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
