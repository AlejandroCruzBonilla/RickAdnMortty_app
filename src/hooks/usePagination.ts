import { useState } from 'react';

export const usePagination = (totalPages: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onFirstPageHandler = () => {
    setCurrentPage(1);
  };
  const onPrevPageHandler = () => {
    setCurrentPage(current => current - 1);
  };
  const onNextPageHandler = () => {
    setCurrentPage(current => current + 1);
  };
  const onLastPageHandler = () => {
    setCurrentPage(totalPages);
  };
  const onSetPageHandler = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,

    onFirstPageHandler,
    onPrevPageHandler,
    onNextPageHandler,
    onLastPageHandler,
    onSetPageHandler,
  };
};
