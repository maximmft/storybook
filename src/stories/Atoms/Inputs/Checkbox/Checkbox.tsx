import * as React from "react";
import { Checkbox as MuiCheckbox, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check } from "lucide-react";

type CheckboxProps = {
 checked: boolean;
 disabled?: boolean;
 label?: string;
 labelPosition?: "left" | "right";
 size?: "small" | "medium";
 indeterminate?: boolean;
 onCheckChange?: (checked: boolean) => void;
 onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UncheckedIcon = styled('div')({
 width: 16,
 height: 16,
 backgroundColor: "#FFFFFF",
 border: "1px solid #E3DFDA",
 borderRadius: "2px",
 boxSizing: "border-box",
});

const CheckedIcon = styled('div')({
 width: 16,
 height: 16,
 backgroundColor: "#000000",
 border: "1px solid #000000",
 borderRadius: "2px",
 boxSizing: "border-box",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 color: "#FFFFFF",
});

const IndeterminateIcon = styled('div')({
 width: 16,
 height: 16,
 backgroundColor: "#000000",
 border: "1px solid #000000",
 borderRadius: "2px",
 boxSizing: "border-box",
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 '&::after': {
   content: '""',
   width: 8,
   height: 2,
   backgroundColor: "#FFFFFF",
 },
});

const StyledCheckbox = styled(MuiCheckbox)(({ disabled }) => ({
 width: 16,
 height: 16,
 padding: 0,
 cursor: disabled ? "not-allowed" : "pointer",
 opacity: disabled ? 0.5 : 1,
 
 "&:hover": {
   backgroundColor: "#F7F5F3",
   borderRadius: "2px",
 },
 
 "&.Mui-disabled:hover": {
   backgroundColor: "transparent",
 },
 
 "& .MuiTouchRipple-root": {
   display: "none",
 },
}));

export const Checkbox = ({
 checked = false,
 disabled = false,
 label,
 onCheckChange,
 onChange,
 labelPosition = "right",
 size = "medium",
 indeterminate = false,
}: CheckboxProps) => {
 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   if (!disabled) {
     if (onChange) {
       onChange(event);
     } else if (onCheckChange) {
       onCheckChange(event.target.checked);
     }
   }
 };

 const fontSize = size === "small" ? "14px" : "16px";
 const fontWeight = checked ? 400 : 300;
 const fontColor = disabled ? "#E3DFDA" : "#3C3A37";

 return (
   <Box
     sx={{
       display: "flex",
       alignItems: "center",
       flexDirection: labelPosition === "left" ? "row-reverse" : "row",
       gap: label ? "8px" : 0,
     }}
   >
     {label && (
       <Typography
         variant="body2"
         sx={{ fontSize, fontWeight, color: fontColor }}
       >
         {label}
       </Typography>
     )}
     <StyledCheckbox
       checked={checked}
       disabled={disabled}
       indeterminate={indeterminate}
       onChange={handleChange}
       disableRipple
       size="small"
       icon={<UncheckedIcon />}
       checkedIcon={
         <CheckedIcon>
           <Check size={12} strokeWidth={3} />
         </CheckedIcon>
       }
       indeterminateIcon={<IndeterminateIcon />}
     />
   </Box>
 );
};