import TextField from "@mui/material/TextField";
import { forwardRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type ClassicInputPropsType = {
  label: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  type?: string;
  register?: UseFormRegisterReturn;
};

export const ClassicInput = forwardRef<HTMLInputElement, ClassicInputPropsType>(
  (
    {
      label = "Label",
      disabled = false,
      error = false,
      register,
      helperText,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState('');
    const hasValue = value.length > 0;

    return (
      <TextField
        {...register}
        ref={ref}
        label={label}
        disabled={disabled}
        error={error}
        helperText={helperText}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: error 
                ? "#F03538"
                : hasValue
                  ? "#696663" 
                  : "#E3DFDA",
              borderRadius: "8px"
            },
            "&:hover fieldset": {
              borderColor: error 
                ? "#F03538"
                : hasValue
                  ? "#696663"
                  : "#E3DFDA",
            },
            "&.Mui-focused fieldset": {
              borderColor: error ? "#F03538" : "#2D2A27",
              border: "1px solid",
            },
            "&.Mui-disabled fieldset": {
              borderColor: "#F7F5F3",
            },
            "& input": {
              fontWeight: 200,
            },
          },
          "& .MuiInputLabel-root": {
            color: error ? "#F03538" : hasValue ? "#696663" : "#A29D98",
            fontWeight: 200,
          },
          "&:hover .MuiInputLabel-root": {
            color: error ? "#F03538" : hasValue ? "#696663" : "#696663",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: error ? "#F03538" : "#2D2A27",
          },
          "& .MuiInputLabel-root.Mui-disabled": {
            color: "#D4D0CB",
          },
        }}
        {...props}
      />
    );
  }
);