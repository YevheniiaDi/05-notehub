import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) return null;

  const handlePageChange = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      nextClassName={css.next}
      previousClassName={css.previous}
      disabledClassName={css.disabled}
      pageClassName={css.page}
      pageLinkClassName={css.link}
      previousLinkClassName={css.link}
      nextLinkClassName={css.link}
      breakClassName={css.break}
      breakLinkClassName={css.link}
      ariaLabelBuilder={(page) => `Go to page ${page}`}
      nextAriaLabel="Next page"
      previousAriaLabel="Previous page"
    />
  );
};

export default Pagination;
