"use client";
import { useState, ChangeEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { FieldError, UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { Typography, Box } from "@mui/material";

interface TextAreaProps {
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError | string;
  id?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  fieldName?: string;
  watch?: UseFormWatch<any>;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
}

export const TextArea = ({
  placeholder = "",
  id,
  register,
  error,
  label,
  disabled = false,
  value = "",
  fieldName,
  watch,
  required = false,
  maxLength,
  minLength,
}: TextAreaProps) => {
  const watchedValue = watch && fieldName ? watch(fieldName) : undefined;
  const [localText, setLocalText] = useState(value);
  
  const currentValue = watchedValue !== undefined ? watchedValue : localText;
  
  const inputId = id || register?.name || fieldName || label;
  const hasValue = currentValue && currentValue.length > 0;

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    
    if (register?.onChange) {
      register.onChange(event);
    } else {
      setLocalText(newValue);
    }
  };

  const getErrorMessage = () => {
    if (!error) return "";
    if (typeof error === "string") return error;
    return error.message;
  };

  useEffect(() => {
    if (!watch && value !== undefined) {
      setLocalText(value);
    }
  }, [value, watch]);

  const getValidationRules = () => {
    const rules: any = {};
    
    if (required) {
      rules.required = "Ce champ est requis";
    }
    
    if (minLength) {
      rules.minLength = {
        value: minLength,
        message: `Minimum ${minLength} caractères requis`
      };
    }
    
    if (maxLength) {
      rules.maxLength = {
        value: maxLength,
        message: `Maximum ${maxLength} caractères autorisés`
      };
    }
    
    return rules;
  };

  const remainingChars = maxLength ? maxLength - (currentValue?.length || 0) : null;

  return (
    <div className="relative flex flex-col w-full">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <div className="flex justify-between items-center">
          <Typography
            variant="body2"
            sx={{
              color: error ? "#F03538" : disabled ? "#D4D0CB" : "#2D2A27",
              fontWeight: 400,
              fontSize: "14px",
            }}
          >
            {label}
            {required && <span style={{ color: "#F03538" }}> *</span>}
          </Typography>
          
          {maxLength && (
            <Typography
              variant="caption"
              sx={{
                fontSize: "10px",
                color: remainingChars && remainingChars < 10 ? "#F03538" : "#696663",
              }}
            >
              {currentValue?.length || 0}/{maxLength}
            </Typography>
          )}
        </div>

        <TextField
          {...(register ? { ...register, ...getValidationRules() } : {})}
          fullWidth
          id={inputId}
          placeholder={placeholder}
          multiline
          disabled={disabled}
          value={currentValue || ""}
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