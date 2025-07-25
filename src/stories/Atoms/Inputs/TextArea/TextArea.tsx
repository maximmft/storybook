"use client";

import { useState, ChangeEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Typography, Box } from "@mui/material";

interface TextAreaProps {
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError | string;
  id?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
}

export const TextArea = ({
  placeholder = "",
  id,
  register,
  error,
  label,
  disabled = false,
  value = "",
}: TextAreaProps) => {
  const [text, setText] = useState(value);
  const inputId = id || register?.name || label;
  const hasValue = text.length > 0;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    register?.onChange?.(event);
    setText(event.target.value);
  };

  const getErrorMessage = () => {
    if (!error) return "";
    if (typeof error === "string") return error;
    return error.message;
  };

  useEffect(() => {
    if (register?.name) {
      setText(value || "");
    }
  }, [value, register?.name]);

  return (
    <div className="relative flex flex-col w-full">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: error ? "#F03538" : disabled ? "#D4D0CB" : "#2D2A27",
            fontWeight: 400,
            fontSize: "12px",
          }}
        >
          {label}
        </Typography>

        <TextField
          {...register}
          fullWidth
          id={inputId}
          placeholder={placeholder}
          multiline
          disabled={disabled}
          value={text}
          onChange={handleChange}
          variant="outlined"
          error={!!error}
          helperText={getErrorMessage()}
          sx={{
            "& .MuiOutlinedInput-root": {
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
                  : "#E3DFDA",
              },
              "&.Mui-focused fieldset": {
                borderColor: error ? "#F03538" : "#2D2A27",
                border: "1px solid",
              },
              "&.Mui-disabled fieldset": {
                borderColor: "#F7F5F3",
              },
              "& textarea": {
                fontWeight: 200,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#251F19",
                minHeight: "105px",
                "&.Mui-disabled": {
                  WebkitTextFillColor: "#D4D0CB",
                },
                "&::placeholder": {
                  fontSize: "14px",
                  opacity: 1,
                },
              },
            },
            "& .MuiFormHelperText-root": {
              marginLeft: 0,
              marginTop: "3px",
              fontWeight: 200,
              color: error ? "#F03538" : "#696663",
              "&.Mui-disabled": {
                color: "#D4D0CB",
              },
            },
          }}
        />
      </Box>
    </div>
  );
};