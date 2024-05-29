import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Ellipsis, usePagination } from '@/hooks/usePagination';

interface PagingProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

export default function PaginationProvide({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className = '' }: PagingProps) {
  const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize });

  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Pagination className={`${className}`}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={`${currentPage === 1 ? 'pointer-events-none' : 'cursor-pointer'}`} onClick={handlePrevious} />
        </PaginationItem>
        {paginationRange.map((pageNumberOrEllipsis, index) => (
          <PaginationItem key={index}>
            {pageNumberOrEllipsis === Ellipsis ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={`#${pageNumberOrEllipsis}`} isActive={pageNumberOrEllipsis === currentPage} onClick={() => onPageChange(Number(pageNumberOrEllipsis))}>
                {pageNumberOrEllipsis}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext className={`${currentPage === lastPage ? 'pointer-events-none' : 'cursor-pointer'}`} onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
