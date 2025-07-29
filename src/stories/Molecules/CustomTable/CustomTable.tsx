//https://www.figma.com/design/SnhXkYMTPz1vSanVOYEzqq/-CEZAMI---Design-System-%F0%9F%9F%A3?node-id=1-1841&p=f&t=32f6kVyhYP7Jw0vr-0
//A redéfinir les tags, est-ce qu'il faut le même variant pour les mêmes produits ex: les massages = variant 1? + revoir car
//les noms des masseurs doivent être dans des tags aussi?

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { ArrowDownUp } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";
import Tag, {
  tagsConfig,
  VariantsType,
} from "src/stories/Atoms/Informations/Tag/Tag";
import { Checkbox } from "src/stories/Atoms/Inputs/Checkbox/Checkbox";

type PhotoCellPropsType = { imageUrl: string; label: string };
type CellContent = string | ReactElement | ReactNode | PhotoCellPropsType;
type TagStatus = keyof typeof tagsConfig;

interface Column {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  minWidth?: number;
}

type RowData = Record<string, CellContent>;

type CustomTablePropsType = {
  columns: Column[];
  rows: RowData[];
  color?: "primary" | "secondary";
  selectedIndexes: number[];
  onCheck: (index: number) => void;
  onSelectAll?: () => void;
  showHeader?: boolean;
  photoCellVariant?: "circular" | "square";
  variantColumns?: string[];
  page?: number;
  rowsPerPage?: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
};
export const CustomTable = ({
  columns,
  rows,
  selectedIndexes,
  onCheck,
  onSelectAll,
  variantColumns,
  showHeader = true,
  color = "primary",
  photoCellVariant = "circular",
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}: CustomTablePropsType) => {
  const allSelected = rows.length > 0 && selectedIndexes.length === rows.length;
  const someSelected =
    selectedIndexes.length > 0 && selectedIndexes.length < rows.length;

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
    whiteSpace: "nowrap" as const,
  };

  const paginationStyle = {
    fontSize: "12px",
    color: "#374151",
    width: "100%",
    backgroundColor: "#F7F5F3",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    
    "& .MuiTablePagination-toolbar": {
      paddingLeft: "16px",
      paddingRight: "16px",
      minHeight: "52px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
    },
    "& .MuiTablePagination-spacer": {
      display: "none", 
    },
    "& .MuiTablePagination-selectLabel": {
      fontSize: "12px",
      color: "#374151",
      fontWeight: 400,
    },
    "& .MuiTablePagination-select": {
      fontSize: "12px",
      color: "#374151",
    },
    "& .MuiTablePagination-actions": {
      "& .MuiIconButton-root": {
        color: "#374151",
        "&:hover": {
          backgroundColor: "#F7F5F3",
        },
      },
    },
  };
  const getColor = (
    color: "primary" | "secondary",
    isSelected: boolean,
    index: number
  ) => {
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
  const findTag = (cellContent?: CellContent, variant?: VariantsType) => {
    if (typeof cellContent === "string" && cellContent in tagsConfig) {
      return <Tag status={cellContent as TagStatus} variant={variant} />;
    }
    return null;
  };

  const displayPhotoCell = (
    imageUrl: string,
    label: string,
    variant: "circular" | "square"
  ) => {
    return (
      <PhotoCell
        size="small"
        imageSrc={imageUrl}
        label={label}
        variant={variant}
      />
    );
  };

  const renderCellContent = (
    cellContent: CellContent,
    columnId: string,
    rowIndex: number
  ) => {
    if (typeof cellContent === "object" && cellContent !== null) {
      if ("imageUrl" in cellContent && "label" in cellContent) {
        return displayPhotoCell(
          cellContent.imageUrl,
          cellContent.label,
          photoCellVariant
        );
      }
    }

    const tag = findTag(cellContent);

    if (variantColumns?.includes(columnId) && typeof cellContent === "string") {
      const variant = ((rowIndex % 8) + 1) as VariantsType;
      return <Tag variant={variant} label={cellContent} />;
    }

    return tag || cellContent;
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

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
              <TableCell
                sx={{
                  ...headerCellStyle,
                  borderTopLeftRadius: "10px",
                }}
              >
                {onSelectAll && (
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={onSelectAll}
                  />
                )}
              </TableCell>

              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  sx={{
                    ...headerCellStyle,
                    textAlign: column.align || "left",
                    minWidth: column.minWidth,
                    borderTopRightRadius:
                      index === columns.length - 1 ? "10px" : "",
                  }}
                >
                  <div className="flex flex-row items-center shrink-0">
                    {column.label}
                    <ArrowDownUp color="#3C3A37" size={12} className="ml-1" />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {paginatedRows.map((row, index) => {
            const realIndex = startIndex + index;
            const isSelected = selectedIndexes.includes(realIndex);

            return (
              <TableRow
                key={index}
                onClick={() => onCheck(realIndex)}
                sx={{
                  cursor: "pointer",
                  height: "56px",
                  backgroundColor: getColor(color, isSelected, realIndex),
                  "&:hover": {
                    backgroundColor: getHoverColor(color),
                  },
                  "& .MuiTableCell-root": {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell sx={{ ...textCellStyle }}>
                  <Checkbox checked={isSelected} />
                </TableCell>

                {columns.map((column) => {
                  const cellContent = row[column.id];

                  return (
                    <TableCell
                      key={column.id}
                      sx={{
                        ...textCellStyle,
                        textAlign: column.align || "left",
                      }}
                    >
                      <div className="truncate">
                        {renderCellContent(cellContent, column.id, index)}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TablePagination
          page={page}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, newPage) => onPageChange(newPage)}
          onRowsPerPageChange={(event) =>
            onRowsPerPageChange(parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage={
            <span>
              Page {page + 1} sur {Math.ceil(rows.length / rowsPerPage)}
              <span className="ml-1 text-greyscale-600 font-light">
                ({rows.length} items)
              </span>
            </span>
          }
          labelDisplayedRows={() => ""}
          sx={paginationStyle}
        />
      </Table>
    </TableContainer>
  );
};
