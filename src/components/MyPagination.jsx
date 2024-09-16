import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { limit } from "../lib/yutils";

export function MyPagination({ setSkip, total, skip }) {
  return (
    <Pagination className="p-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              setSkip((prev) => {
                if (prev > 0) {
                  return (prev -= limit);
                } else return 0;
              });
            }}
            href="#"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              setSkip((prev) => {
                if (prev + skip > total) {
                  return prev;
                } else return (prev += limit);
              });
            }}
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
