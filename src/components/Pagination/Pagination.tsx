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
      pageClassName={css.page}
      pageLinkClassName={css.link}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      breakClassName={css.break}
      breakLinkClassName={css.link}
      previousClassName={css.previous}
      previousLinkClassName={css.link}
      nextClassName={css.next}
      nextLinkClassName={css.link}
      disabledClassName={css.disabled}
      activeClassName={css.active} // Якщо в твоїй версії ще підтримується
      ariaLabelBuilder={(page) => `Go to page ${page}`}
      nextAriaLabel="Next page"
      previousAriaLabel="Previous page"
    />
  );
};

export default Pagination;
