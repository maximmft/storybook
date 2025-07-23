import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { UseFormRegisterReturn } from 'react-hook-form';

type CustomSwitchPropsType = {
    label: string;
    register: UseFormRegisterReturn;
    value: boolean;
    disabled?: boolean;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: 48,
  height: 20,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(28px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#251F19',
        opacity: 1,
        border: 0,
      },
    },
    '&.Mui-disabled': {
      '& + .MuiSwitch-track': {
        backgroundColor: '#EFECE9 !important', 
        opacity: 1,
      },
    },
 
    "&:hover:not(.Mui-disabled) + .MuiSwitch-track": {
      backgroundColor: "#A29D98", 
    },
  },
  '& .MuiSwitch-thumb': {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: "2px",
    boxShadow: 'none',
  },
  '& .MuiSwitch-track': {
    borderRadius: "2px",
    backgroundColor: '#E9E9EA',
    opacity: 1
  },
}));
export default function ToggleSwitch({label, register, value, disabled} : CustomSwitchPropsType) {
    return (
      <FormGroup>
        <FormControlLabel
          control={
          <IOSSwitch sx={{ m: 1 }} 
          {...register}
          />
        }
          label={label}
          labelPlacement="start"
          checked={value ?? false}
          disabled={disabled}
          className="tw-ml-0 tw-w-full tw-justify-between semibold-15"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontFamily: 'Fustat',
              fontSize: '15px',
              fontWeight: 400,
            }
          }}
        />
      </FormGroup>
    );
  }