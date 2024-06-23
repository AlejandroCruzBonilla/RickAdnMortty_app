export interface IPaginationButtons {
  totalPages: number;
  currentPage: number;
  onFirstPage: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onLastPage: () => void;
  onSetPage: (page: number) => void;
}
