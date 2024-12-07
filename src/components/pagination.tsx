import { NextIcon, PreviousLinkIcon } from "@/icons/page";
import { FilterState } from "@/types/filter";
import React from "react";

interface PaginationType {
  filter: FilterState;
  totalPage: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({ filter, totalPage, onPageChange }: PaginationType) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const maxVisiblePages = isMobile ? 2 : 3;
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  const currentPage = filter.page;

  const itemsPerPage = filter.offset;
  const totalPages = Math.ceil(totalPage / itemsPerPage);

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
        <li className="flex items-center ">
          <button
            className={`border hover:${
              currentPage === 1 ? "" : "border"
            } rounded  px-4 py-1 hover:${
              currentPage === 1 ? "" : "text-white"
            } ${currentPage === 1 ? "cursor-not-allowed opacity-50" : ""}`}
            onClick={handlePreviousClick}
            disabled={currentPage == 1}
          >
            <PreviousLinkIcon size={20} />
          </button>
        </li>
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
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`rounded px-3 py-1 ${
                currentPage === page
                  ? "border text-neon_pink hover:bg-neon_pink hover:text-white"
                  : "border text-neon_pink hover:bg-neon_pink hover:text-white"
              }`}
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {endPage < totalPages - 1 && (
          <li>
            <span className="px-3 py-1">...</span>
          </li>
        )}
        {endPage < totalPages && (
          <li>
            <button
              className=" rounded-full bg-white px-4 py-1 hover:bg-neon_blue hover:text-b_text"
              onClick={() => onPageChange && onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li className="flex items-center bg-white">
          <button
            className={`border  hover:${
              currentPage === totalPages ? "" : "text-white"
            } hover:${
              currentPage === totalPages ? "" : "bg-neon_pink border"
            } rounded text-neon_pink px-3 py-1 ${
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
