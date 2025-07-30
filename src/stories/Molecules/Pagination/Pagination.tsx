import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  pages: number;
  page: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination = ({ pages, onPageChange, page }: PaginationProps) => {
  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1);

  let start = Math.max(0, page - 1);
  let end = Math.min(pages, start + 3);
  if (end - start < 3) {
    start = Math.max(0, end - 3);
  }

  const visiblePages = pagesArray.slice(start, end);
  
  return (
    <div className="flex flex-row items-center w-full gap-4">
      <ArrowLeft
        onClick={() => onPageChange(page - 1)}
        size={14}
        className={`cursor-pointer ${
          page === 0 ? "opacity-20 pointer-events-none" : ""
        }`}
      />
      <div className="flex flex-row space-x-2">
        <>
          {start > 0 && (
            <>
              <p className="text-[14px] text-greyscale-700 font-normal cursor-pointer"
                 onClick={() => onPageChange(0)}>
                1
              </p>
              <p className="text-greyscale-600">...</p>
            </>
          )}

          {visiblePages.map((pageNumber) => {
            return (
              <p
                key={pageNumber}
                className={`text-[14px] cursor-pointer ${
                  pageNumber === page + 1
                    ? "font-semibold text-greyscale-900"
                    : "text-greyscale-700 font-normal"
                }`}
                onClick={() => onPageChange(pageNumber - 1)}
              >
                {pageNumber}
              </p>
            );
          })}

          {end < pages && start === 0 && (
            <>
              <p className="text-greyscale-600">...</p>
              <p
                className={`text-[14px] cursor-pointer ${
                  page === pages - 1
                    ? "font-semibold text-greyscale-900"
                    : "text-greyscale-700 font-normal"
                }`}
                onClick={() => onPageChange(pages - 1)}
              >
                {pages}
              </p>
            </>
          )}
        </>
      </div>
      <ArrowRight
        onClick={() => onPageChange(page + 1)}
        size={14}
        className={`cursor-pointer ${
          page === pages - 1 ? "opacity-20 pointer-events-none" : ""
        }`}
      />
    </div>
  );
};