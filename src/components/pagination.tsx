import { NextIcon, PreviousLinkIcon } from "@/icons/page";
import { IFilter } from "@/types/product";
import React from "react";

interface PaginationType {
  filter: IFilter;
  totalPage: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({ filter, totalPage, onPageChange }: PaginationType) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const maxVisiblePages = isMobile ? 2 : 3;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  const currentPage = filter.page;

  // Default offset to 1 if undefined
  const itemsPerPage = filter.limit || 1;

  // Calculate total pages based on total items and items per page
  const totalPages = Math.ceil(totalPage / itemsPerPage);

  // console.log("Total Items:", totalPage);
  // console.log("Items Per Page:", itemsPerPage);
  // console.log("Calculated Total Pages:", totalPages);

  // Calculate visible page range
  const startPage = Math.max(1, currentPage - halfMaxVisiblePages);
  const endPage = Math.min(totalPages, currentPage + halfMaxVisiblePages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePreviousClick = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="mt-4 flex justify-center bg-white">
      <ul className="flex space-x-2 bg-white">
        {/* Previous Button */}
        <li className="flex items-center">
          <button
            className={`border rounded px-4 py-1 ${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
          >
            <PreviousLinkIcon size={20} />
          </button>
        </li>

        {/* First Page Button */}
        {startPage > 1 && (
          <li>
            <button
              className="border rounded-full px-4 py-1 hover:bg-neon_pink"
              onClick={() => onPageChange && onPageChange(1)}
            >
              1
            </button>
          </li>
        )}
        {startPage > 2 && (
          <li>
            <span className="px-4 py-1">...</span>
          </li>
        )}

        {/* Visible Pages */}
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`rounded px-3 py-1 ${
                currentPage === page
                  ? "bg-neon_pink text-white"
                  : "border text-neon_pink hover:bg-neon_pink hover:text-white"
              }`}
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Last Page Button */}
        {endPage < totalPages - 1 && (
          <li>
            <span className="px-3 py-1">...</span>
          </li>
        )}
        {endPage < totalPages && (
          <li>
            <button
              className="border rounded-full px-4 py-1 hover:bg-neon_blue hover:text-b_text"
              onClick={() => onPageChange && onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}

        {/* Next Button */}
        <li className="flex items-center">
          <button
            className={`border rounded px-3 py-1 ${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            <NextIcon size={20} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

// export default Pagination;
