import { useCallback, useEffect, useState, type FC } from 'react';
import { Button } from 'primereact/button';
import type { IPaginationButtons } from './interfaces';

export const PaginationButtons: FC<IPaginationButtons> = ({
  currentPage,
  // totalItems,
  totalPages,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
  onSetPage,
}) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentPageNumbers, setCurrentPageNumbers] = useState<number[]>([]);

  const getPageNumbers = useCallback(() => {
    const pages = Array.from({ length: totalPages }, (_, index) => index);

    return pages.map(page => page + 1);
  }, [totalPages]);

  const getCurrentPageNumbers = useCallback(() => {
    let previous: number | null = currentPage - 1;
    let next: number | null = currentPage + 1;

    if (currentPage === 1) previous = null;

    if (currentPage === pageNumbers[pageNumbers.length - 1]) next = null;
    const currentPageNumbers = pageNumbers.filter(num => {
      return num === previous || num === currentPage || num === next;
    });

    return currentPageNumbers;
  }, [currentPage, pageNumbers]);

  useEffect(() => {
    setPageNumbers(getPageNumbers());
  }, [getPageNumbers, totalPages]);

  useEffect(() => {
    setCurrentPageNumbers(getCurrentPageNumbers());
  }, [currentPage, getCurrentPageNumbers]);

  return (
    <div className='flex flex-wrap justify-center gap-1'>
      <Button
        className='button'
        disabled={currentPage === 1}
        onClick={onFirstPage}
        text
      >
        &lt; &lt;
      </Button>
      <Button
        className='button'
        disabled={currentPage === 1}
        onClick={onPrevPage}
        text
      >
        &lt;
      </Button>
      {currentPageNumbers.map(number => (
        <Button
          text={currentPage !== number}
          key={number}
          className='button'
          onClick={() => onSetPage(number)}
        >
          {number}
        </Button>
      ))}
      <Button
        className='button'
        disabled={currentPage === totalPages}
        onClick={onNextPage}
        text
      >
        &gt;
      </Button>
      <Button
        className='button'
        disabled={currentPage === totalPages}
        onClick={onLastPage}
        text
      >
        &gt;&gt;
      </Button>
    </div>
  );
};
