import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowDownUp } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";
import Tag from "src/stories/Atoms/Informations/Tag/Tag";
import { Checkbox } from "src/stories/Atoms/Inputs/Checkbox/Checkbox";


type CellContent = string | ReactElement | ReactNode;

type CustomTablePropsType = {
  tableRowData: CellContent[][];
  color?: "primary" | "secondary",
  selectedIndexes: number[];
  onCheck: (index: number) => void;
  onSelectAll?: () => void;
  showHeader?: boolean;
  headerTitles: string[];
};

export const CustomTable = ({
  tableRowData,
  selectedIndexes,
  onCheck,
  onSelectAll,
  headerTitles,
  showHeader = true,
  color = "primary"
}: CustomTablePropsType) => {

  const textCellStyle = {
    padding: "16px",
    fontSize: "12px",
    color: "#374151",
    fontWeight: 400,
    border: "none",
  };

  const headerCellStyle = {
    padding: "16px",
    fontSize: "12px",
    color: "#3C3A37",
    fontWeight: 300,
    backgroundColor: "#F7F5F3",
    border: "none",
    whiteSpace: "preserve nowrap"

  };

  const allSelected =
  tableRowData.length > 0 && selectedIndexes.length === tableRowData.length;
  const someSelected =
    selectedIndexes.length > 0 && selectedIndexes.length < tableRowData.length;

    const getColor = (color: "primary" | "secondary", isSelected: boolean, index: number) => {
      if (color === "primary") {
        if (isSelected) return "#EFECE9";
        return index % 2 === 0 ? "#ffffff" : "#FBFAF9";
      }
      if (color === "secondary") {
        if (isSelected) return "#A0B5A2";
        return index % 2 === 0 ? "#ffffff" : "#FBFAF9";
      }
      return "#ffffff"; 
    };
    
  const getHoverColor = (color: "primary" | "secondary") => {
    return color === "primary" ? "#F7F5F3" : "#C6D4C7";
  };

  return (
    <TableContainer
      sx={{
        boxShadow: "none",
        border: "none",
        "& .MuiTable-root": {
          borderCollapse: "separate",
        },
      }}
    >
      <Table>
        {showHeader && (
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>
                {onSelectAll && (
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={onSelectAll}
                  />
                )}
              </TableCell>
              {headerTitles.map((title) => (
                <TableCell sx={headerCellStyle}>
                  <div className="flex flex-row items-center shrink-0">
                    {title} <ArrowDownUp color="#3C3A37" size={12} className="ml-1" />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {tableRowData.map((row, index) => {
            const isSelected = selectedIndexes.includes(index);

            return (
              <TableRow
              key={index}
              onClick={() => onCheck(index)}
              sx={{
                cursor: "pointer",
                height: "56px",
                backgroundColor: getColor(color, isSelected, index),
                "&:hover": {
                  backgroundColor: getHoverColor(color),
                },
                "& .MuiTableCell-root": {
                  borderBottom: "none",
                },
              }}
            >
                <TableCell
                  sx={{ ...textCellStyle, width: "auto", flexShrink: 0 }}
                >
                  <Checkbox checked={isSelected} />
                </TableCell>

                {row.map((cellContent, cellIndex) => (
                  <TableCell key={cellIndex} sx={textCellStyle}>
                    <div className="truncate">
                      {cellContent}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
