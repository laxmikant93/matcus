import React from 'react';
import "./pagination.scss";
import { DOTS, usePagination } from './usePagination';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 0,
    currentPage,
    pageSize,
    className
  } = props;
console.log(  currentPage,
  totalCount,
  siblingCount,
  pageSize,"line 16")
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = pageSize? paginationRange[paginationRange.length - 1]:0;
  return (
    <ul
      className='pagination_list'
    >
      {/* Left navigation arrow */}
      <li
        onClick={onPrevious}
        className={`arrow left ${currentPage === 1 ? "disabled" : "enable"}`}
      >
        <span>&#60;</span>
      </li>
      {paginationRange.map(pageNumber => {

        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={currentPage === pageNumber ? 'pagi_active' : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        // disabled={currentPage === lastPage}
        onClick={onNext}
        className={`arrow right ${currentPage === paginationRange[paginationRange.length - 1] ? "disabled" : "enable"}`}
      >
        <span>&#62;</span>
      </li>
    </ul>
  );
};

export default Pagination;