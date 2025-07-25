import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

type PaginationProps = {
  pages?: number[];
};

export const Pagination = ({ pages = [] }: PaginationProps) => {
  const [actualPageIndex, setActualPageIndex] = useState(0);

  const handleNextPage = () => {
    if (actualPageIndex < pages.length - 1) {
      setActualPageIndex(actualPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (actualPageIndex > 0) {
      setActualPageIndex(actualPageIndex - 1);
    }
  };

  let start = Math.max(0, actualPageIndex - 1);
  let end = Math.min(pages.length, start + 3);
  if (end - start < 3) {
    start = Math.max(0, end - 3);
  }

  const visiblePages = pages.slice(start, end);

  return (
    <div className="flex flex-row items-center gap-x-2 w-full">
      <ArrowLeft
        onClick={handlePreviousPage}
        size={14}
        className={`cursor-pointer ${actualPageIndex === 0 ? "opacity-20 pointer-events-none" : ""}`}
      />

      {pages.length > 3 ? (
        <>
          {visiblePages.map((page, index) => {
            const pageIndex = start + index;
            return (
              <p
                key={pageIndex}
                className={`text-[14px] ${
                  pageIndex === actualPageIndex
                    ? "font-semibold text-greyscale-900"
                    : "text-greyscale-700 font-normal"
                }`}
              >
                {page}
              </p>
            );
          })}

          {end < pages.length && <p className="text-greyscale-600">...</p>}

          {end < pages.length && (
            <p
              key={pages.length - 1}
              className={`text-[14px] ${
                actualPageIndex === pages.length - 1
                  ? "font-semibold text-greyscale-900"
                  : "text-greyscale-700 font-normal"
              }`}
            >
              {pages[pages.length - 1]}
            </p>
          )}
        </>
      ) : (
        pages.map((page, index) => (
          <p
            key={index}
            className={`text-[14px] ${
              index === actualPageIndex
                ? "font-semibold text-greyscale-900"
                : "text-greyscale-700 font-normal"
            }`}
          >
            {page}
          </p>
        ))
      )}

      <ArrowRight
        onClick={handleNextPage}
        size={14}
        className={`cursor-pointer ${actualPageIndex === pages.length - 1 ? "opacity-20 pointer-events-none" : ""}`}
      />
    </div>
  );
};
