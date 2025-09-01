import * as React from "react";
import { Tabs, Tab, Box, SxProps, Theme } from "@mui/material";

interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactElement; 
  iconPosition?: 'start' | 'end'; 
}

type TabVariant = "standard" | "solid";

interface CustomTabsProps {
  tabs: TabItem[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  variant?: TabVariant;
  centered?: boolean;
}

const getTabStyles = (variant: TabVariant): SxProps<Theme> => {
  const variants = {
    standard: {
      minHeight: 0,
      "& .MuiTabs-scroller": {
        height: "42px",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "#29382C",
        height: "2px",
        borderTopLeftRadius: "2px",
        borderTopRightRadius: "2px",
      },
      "& .MuiTab-root.Mui-selected": {
        color: "#29382C",
      },
      "& .MuiTab-root": {
        textTransform: "none",
        color: "#696663",
        fontSize: "14px",
        padding: "0px 24px",
      },
      "& .MuiTab-root.Mui-disabled": {
        color: "#E3DFDA",
      },
    },
    solid: {
      minHeight: 0,
      "& .MuiTabs-list": {
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      "& .MuiTabs-scroller": {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#F7F5F3",
        borderRadius: "8px",
        padding: "8px",
      },
      "& .MuiTabs-indicator": {
        backgroundColor: "transparent",
      },
      "& .MuiTab-root.Mui-selected": {
        backgroundColor: "#29382C",
        color: "#ffffff",
        borderRadius: "8px",
        fontWeight: "500",
        minHeight: "37px",
        "& .MuiTab-iconWrapper": {
          color: "#ffffff",
        },
      },
      "& .MuiTab-root": {
        textTransform: "none",
        color: "#696663",
        fontSize: "12px",
        padding: "8px 16px",
        marginRight: "4px",
        borderRadius: "4px",
        height: "37px",
        minHeight: "37px",
        "& .MuiTab-iconWrapper": {
          fontSize: "14px",
          color: "#A29D98",
        },
      },
      "& .MuiTab-root.Mui-disabled": {
        color: "#E3DFDA",
        "& .MuiTab-iconWrapper": {
          color: "#E3DFDA",
        },
      },
      "& .MuiTab-root:hover:not(.Mui-selected)": {
        backgroundColor: "#4C574F",
        color: "white",
        borderRadius: "8px",
        fontWeight: "300",
        "& .MuiTab-iconWrapper": {
          color: "white",
        },
      },
    },
  };

  return variants[variant];
};

export default function CustomTabs({
  tabs,
  defaultValue = 0,
  onChange,
  variant = "standard",
  centered = false,
}: CustomTabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  if (!tabs?.length) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: variant === "standard" ? 1 : 0,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          sx={getTabStyles(variant)}
          centered={centered}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={variant === "solid" ? tab.icon : undefined}
              iconPosition={tab.iconPosition || 'start'}
              disabled={tab.disabled}
            />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <div key={index} hidden={value !== index}>
          {value === index && <Box sx={{ pt: 2 }}>{tab.content}</Box>}
        </div>
      ))}
    </Box>
  );
}