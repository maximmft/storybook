import { forwardRef, useState, useRef, useEffect } from "react";
import { UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { Box, Typography, IconButton, Popover, ClickAwayListener } from "@mui/material";
import { ChevronLeft, ChevronRight, KeyboardArrowDown } from "@mui/icons-material";

type DatePickerPropsType = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  register?: UseFormRegisterReturn;
  required?: boolean;
  fieldName?: string;
  watch?: UseFormWatch<any>;
  onChange?: (date: string) => void;
  value?: string;
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerPropsType>(
  (
    {
      label = "Date de début",
      placeholder = "JJ/MM/AAAA",
      disabled = false,
      error = false,
      register,
      helperText,
      fieldName,
      watch,
      required = false,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const fieldValue = watch && fieldName ? watch(fieldName) : value || "";
    const safeFieldValue = fieldValue != null ? String(fieldValue) : "";
    const hasValue = safeFieldValue.trim().length > 0;

    useEffect(() => {
      if (safeFieldValue) {
        const parsedDate = parseDate(safeFieldValue);
        if (parsedDate) {
          setSelectedDate(parsedDate);
          setCurrentMonth(parsedDate);
        }
      }
    }, [safeFieldValue]);

    const parseDate = (dateStr: string): Date | null => {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; 
        const year = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return null;
    };

    const formatDate = (date: Date): string => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const handleInputClick = (event: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        setAnchorEl(event.currentTarget);
        setIsOpen(true);
      }
    };

    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      const formattedDate = formatDate(date);
      
      if (register) {
        const event = {
          target: { value: formattedDate, name: register.name },
          type: 'change'
        } as any;
        register.onChange(event);
      }
      
      if (onChange) {
        onChange(formattedDate);
      }
      
      setIsOpen(false);
    };

    const handleClose = () => {
      setIsOpen(false);
      setShowYearPicker(false);
      setAnchorEl(null);
    };

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      const days: (Date | null)[] = [];
      
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
      
      return days;
    };

    const isToday = (date: Date) => {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    };

    const isSameDate = (date1: Date, date2: Date | null) => {
      if (!date2) return false;
      return date1.toDateString() === date2.toDateString();
    };

    const generateYearRange = () => {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 50;
      const endYear = currentYear + 10;
      const years = [];
      for (let year = startYear; year <= endYear; year++) {
        years.push(year);
      }
      return years;
    };

    const handleYearSelect = (year: number) => {
      const newMonth = new Date(currentMonth);
      newMonth.setFullYear(year);
      setCurrentMonth(newMonth);
      setShowYearPicker(false);
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      const newMonth = new Date(currentMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      setCurrentMonth(newMonth);
    };

    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

    const displayValue = selectedDate ? formatDate(selectedDate) : safeFieldValue;

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
          {label} {required && <span style={{ color: "#F03538" }}>*</span>}
        </Typography>

        <Box
          ref={inputRef}
          onClick={handleInputClick}
          sx={{
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            backgroundColor: disabled ? "#F7F5F3" : "white",
            border: `1px solid ${
              error ? "#F03538" : hasValue ? "#696663" : "#E3DFDA"
            }`,
            borderRadius: "8px",
            cursor: disabled ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: 300,
            color: displayValue ? "#2D2A27" : "#A29D98",
            "&:hover": {
              borderColor: disabled 
                ? "#F7F5F3" 
                : error 
                ? "#F03538" 
                : "#696663",
            },
          }}
        >
          <span>{displayValue || placeholder}</span>
          <KeyboardArrowDown sx={{ color: "#2D2A27", fontSize: "20px" }} />
        </Box>

        {helperText && (
          <Typography
            variant="caption"
            sx={{
              color: error ? "#F03538" : "#A29D98",
              fontSize: "12px",
            }}
          >
            {helperText}
          </Typography>
        )}

        <Popover
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              marginTop: 1,
              borderRadius: "12px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              border: "1px solid #E3DFDA",
            }
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ p: 3, width: "320px" }}>

              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                mb: 2 
              }}>
                <IconButton 
                  onClick={() => navigateMonth('prev')}
                  sx={{ p: 0.5 }}
                  disabled={showYearPicker}
                >
                  <ChevronLeft sx={{ fontSize: "20px", color: showYearPicker ? "#D4D0CB" : "#696663" }} />
                </IconButton>
                
                <Box 
                  onClick={() => setShowYearPicker(!showYearPicker)}
                  sx={{ 
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
            
                  }}
                >
                  <Typography sx={{ 
                    fontSize: "16px", 
                    fontWeight: 500, 
                    color: "#2D2A27",
                    textAlign: "center"
                  }}>
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </Typography>
                  <KeyboardArrowDown 
                    sx={{ 
                      fontSize: "16px", 
                      color: "#696663",
                      transform: showYearPicker ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease-in-out"
                    }} 
                  />
                </Box>
                
                <IconButton 
                  onClick={() => navigateMonth('next')}
                  sx={{ p: 0.5 }}
                  disabled={showYearPicker}
                >
                  <ChevronRight sx={{ fontSize: "20px", color: showYearPicker ? "#D4D0CB" : "#696663" }} />
                </IconButton>
              </Box>

              {showYearPicker ? (
                <Box sx={{ 
                  maxHeight: "280px", 
                  overflowY: "auto",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "4px",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#F7F5F3",
                    borderRadius: "3px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#D4D0CB",
                    borderRadius: "3px",
                    "&:hover": {
                      backgroundColor: "#A29D98",
                    }
                  }
                }}>
                  {generateYearRange().map((year) => (
                    <Box
                      key={year}
                      onClick={() => handleYearSelect(year)}
                      sx={{
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#2D2A27",
                        backgroundColor: year === currentMonth.getFullYear() 
                          ? "#2D2A27" 
                          : "transparent",
                        "&:hover": {
                          backgroundColor: year === currentMonth.getFullYear()
                            ? "#2D2A27"
                            : "#F7F5F3",
                        },
                        ...(year === currentMonth.getFullYear() && {
                          color: "white",
                          fontWeight: 500,
                        }),
                      }}
                    >
                      {year}
                    </Box>
                  ))}
                </Box>
              ) : (
                <>

                  <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(7, 1fr)", 
                    gap: 1, 
                    mb: 1 
                  }}>
                    {dayNames.map((day) => (
                      <Box
                        key={day}
                        sx={{
                          textAlign: "center",
                          py: 1,
                          fontSize: "12px",
                          fontWeight: 300,
                          color: "#3C3A37",
                        }}
                      >
                        {day}
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(7, 1fr)", 
                    gap: "2px" 
                  }}>
                    {getDaysInMonth(currentMonth).map((day, index) => (
                      <Box
                        key={index}
                        onClick={day ? () => handleDateSelect(day) : undefined}
                        sx={{
                          height: "32px",
                          width: "32px",
                          marginLeft: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: day ? "pointer" : "default",
                          borderRadius: "100%",
                          fontSize: "12px",
                          fontWeight: 400,
                          color: day ? "#2D2A27" : "transparent",
                          backgroundColor: day && isSameDate(day, selectedDate) 
                            ? "#e3e9e2" 
                            : "transparent",
                          "&:hover": day ? {
                            backgroundColor: isSameDate(day, selectedDate) 
                              ? "#e3e9e2" 
                              : "#F7F5F3",
                          } : {},
                          ...(day && isSameDate(day, selectedDate) && {
                            color: "#2D2A27",
                            fontWeight: 400,
                          }),
                          ...(day && isToday(day) && !isSameDate(day, selectedDate) && {
                            position: "relative",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              bottom: "2px",
                              width: "4px",
                              height: "4px",
                              backgroundColor: "#2D2A27",
                              borderRadius: "50%",
                            }
                          }),
                        }}
                      >
                        {day?.getDate()}
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </ClickAwayListener>
        </Popover>

        <input
          {...register}
          ref={ref}
          type="hidden"
          value={displayValue}
          {...props}
        />
      </Box>
    );
  }
);