import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { forwardRef, useState } from "react";
import { Typography, Box } from "@mui/material";

type SearchBarPropsType = {
  placeholder?: string;
  label?: string;
  displayLabel?: boolean;
  disabled?: boolean;
  error?: boolean;
  onSearch: (value: string) => void;
  onClear?: () => void;
  defaultValue?: string;
};

export const SearchBar = forwardRef<HTMLInputElement, SearchBarPropsType>(
  (
    {
      placeholder = "Placeholder",
      label = "Label",
      disabled = false,
      error = false,
      displayLabel = true,
      onSearch,
      onClear,
      defaultValue = "",
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const hasValue = value.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onSearch(e.target.value);
    };

    const handleClear = () => {
      setValue("");
      onClear?.();
    };

    const getFieldsetBorderColor = () => {
      if (error) return "#F03538";
      if (disabled) return "#F7F5F3";
      if (hasValue) return "#696663";
      return "#E3DFDA";
    };

    const getHoverBorderColor = () => {
      if (error) return "#F03538";
      if (disabled) return "#F7F5F3";
      return "#696663";
    };

    const getIconColor = () => {
      if (error) return "#2D2A27";
      if (disabled) return "#D4D0CB";
      if (hasValue) return "#696663";
      return "#A29D98";
    };

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {displayLabel && (
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
        )}
        <TextField
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          error={error}
          value={value}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: getIconColor(),
                    fontSize: "16px",
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  opacity: hasValue ? 1 : 0,
                  transform: hasValue ? "scale(1)" : "scale(0.8)",
                  transition: "all 0.2s ease-in-out",
                  pointerEvents: hasValue ? "auto" : "none",
                }}
              >
                <IconButton
                  onClick={handleClear}
                  disabled={disabled}
                  size="small"
                  sx={{
                    color: getIconColor(),
                    padding: "4px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ClearIcon sx={{ fontSize: "16px" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              "& fieldset": {
                borderColor: getFieldsetBorderColor(),
                borderRadius: "100px",
              },
              "&:hover fieldset": {
                borderColor: getHoverBorderColor(),
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
                fontSize: "12px",
                "&::placeholder": {
                  color: error ? "#F03538" : disabled ? "#D4D0CB" : "#A29D98",
                  opacity: 1,
                  fontWeight: 200,
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
