import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowDownUp, Copy, Ellipsis, Eye, Trash } from "lucide-react";
import { ReactElement, ReactNode, useState } from "react";
import PhotoCell from "src/stories/Atoms/Cells/PhotoCell/PhotoCell";
import Tag, {
  tagsConfig,
  VariantsType,
} from "src/stories/Atoms/Informations/Tag/Tag";
import { Checkbox } from "src/stories/Atoms/Inputs/Checkbox/Checkbox";
import { CustomPaginationFooter } from "./CustomPaginationFooter";
import { IconButton } from "src/stories/Atoms/Buttons/IconButton/IconButton";
import { Button } from "src/stories/Atoms/Buttons/Button/Button";

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
  deletable?: boolean;
  watchable?: boolean;
  copyable?: boolean;
  watchButtonlabel?: string,
  watchButtonIconDirection?: "left" | "right",
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
  deletable = false,
  watchable = false,
  copyable = false,
  watchButtonlabel = "Aperçu",
  watchButtonIconDirection = "right",
  onPageChange,
  onRowsPerPageChange,
}: CustomTablePropsType) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedIndexRow, setSelectedIndexRow] = useState<number>(-1);

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
      if (isSelected) return "#C6D4C7";
      return index % 2 === 0 ? "#ffffff" : "#FBFAF9";
    }
    return "#ffffff";
  };

  const getHoverColor = (color: "primary" | "secondary") => {
    return color === "primary" ? "#F7F5F3" : "#E3E9E2";
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

  const handleSettings = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSelectedIndexRow(index);
    setIsSettingsOpen(true);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  const showSettings = watchable || deletable || copyable;

  return (
    <div className="w-full">
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
                        !showSettings && index === columns.length - 1
                          ? "10px"
                          : "",
                    }}
                  >
                    <div className="flex flex-row items-center shrink-0">
                      {column.label}
                      <ArrowDownUp color="#3C3A37" size={12} className="ml-1" />
                    </div>
                  </TableCell>
                ))}
                {showSettings && (
                  <TableCell
                    sx={{
                      ...headerCellStyle,
                      textAlign: "left",
                      borderTopRightRadius: "10px",
                    }}
                  >
                    Accès
                  </TableCell>
                )}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheck(realIndex);
                  }}
                  sx={{
                    cursor: "pointer",
                    height: "56px",
                    position: "relative",
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
                  {showSettings && realIndex !== selectedIndexRow && (
                    <TableCell
                      sx={{
                        ...textCellStyle,
                        padding: "0px 16px",
                      }}
                    >
                      <IconButton
                        icon={Ellipsis}
                        variant="secondary"
                        onClick={(e) => handleSettings(e, realIndex)}
                      />
                    </TableCell>
                  )}
                  {isSettingsOpen && realIndex === selectedIndexRow && (
                    <div className="absolute inset-y-0 right-0 flex items-center mr-2 gap-2">
                      {watchable && (
                        <Button
                          label={watchButtonlabel}
                          icon={Eye}
                          iconPosition={watchButtonIconDirection}
                        />
                      )}
                      {copyable && (
                        <IconButton icon={Copy} variant="secondary" />
                      )}
                      {deletable && <IconButton icon={Trash} variant="alert" />}
                    </div>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomPaginationFooter
        page={page}
        rowsPerPage={rowsPerPage}
        count={rows.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </div>
  );
};
