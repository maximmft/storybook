import TextField from "@mui/material/TextField";
import { forwardRef, useState } from "react";
import { UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { Box, Typography } from "@mui/material";

type ClassicInputPropsType = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  fieldName?: string;
  watch?: UseFormWatch<any>;
};

export const ClassicInput = forwardRef<HTMLInputElement, ClassicInputPropsType>(
  (
    {
      label = "Label",
      placeholder,
      disabled = false,
      error = false,
      register,
      helperText,
      type = "text",
      fieldName,
      watch,
      required = false,
      ...props
    },
    ref
  ) => {
    const fieldValue = watch && fieldName ? watch(fieldName) : "";

    const hasValue = fieldValue && fieldValue.length > 0;

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: error ? "#F03538" : disabled ? "#D4D0CB" : "#2D2A27",
            fontWeight: 400,
            fontSize: "14px",
          }}
        >
          {label} {required && <span className="text-[#F03538]">*</span>}
        </Typography>

        <TextField
          {...register}
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
          value={fieldValue}
          helperText={helperText}
          type={type}
          InputLabelProps={{
            shrink: false,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "48px",
              fontSize: "14px",
              backgroundColor: "white",
              borderRadius: "8px",

              "& fieldset": {
                borderColor: error
                  ? "#F03538"
                  : hasValue
                  ? "#696663"
                  : "#E3DFDA",
                borderRadius: "8px",
              },
              "&:hover fieldset": {
                borderColor: error
                  ? "#F03538"
                  : hasValue
                  ? "#696663"
                  : "#696663",
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
                "&::placeholder": {
                  color: "#A29D98",
                  opacity: 1,
                },
              },
            },
          }}
          {...props}
        />
      </Box>
    );
  }
);
