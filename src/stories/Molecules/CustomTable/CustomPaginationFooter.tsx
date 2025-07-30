import { Button } from "src/stories/Atoms/Buttons/Button/Button";
import { Download } from "lucide-react";
import { Pagination } from "../Filters/Pagination/Pagination";

const paginationStyle = {
  fontSize: "12px",
  color: "#374151",
  width: "100%",
  backgroundColor: "#F7F5F3",
  borderBottomRightRadius: "10px",
  borderBottomLeftRadius: "10px",
};

type CustomPaginationFooterProps = {
  page: number;
  rowsPerPage: number;
  count: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
};

export const CustomPaginationFooter = ({
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
}: CustomPaginationFooterProps) => {
  const pagesCount = Math.ceil(count / rowsPerPage);
  
  return (
    <div style={paginationStyle}>
      <div className="flex items-center justify-between w-full p-4">
        <div className="flex flex-row gap-4">
          <span className="text-[12px] text-[#374151] font-normal">
            Page {page + 1} sur {pagesCount}
            <span className="ml-1 text-greyscale-600 font-light">
              ({count} items)
            </span>
          </span>
          <div>
            <Pagination
              pages={pagesCount}
              onPageChange={onPageChange}
              page={page}
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-6">
          <div>
            <Button variant="tertiary" label="Exporter" icon={Download}/>
          </div>
          <div className="flex flex-row items-center gap-2">

          <p>Affichage</p>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
            style={{
                fontSize: "12px",
                color: "#374151",
                backgroundColor: "#FFFFFF",
                border: "solid 0.5px #D4D0CB",
                borderRadius: "10px",
                padding: "4px 8px",
            }}
            >
            {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
            </div>
        </div>
      </div>
    </div>
  );
};