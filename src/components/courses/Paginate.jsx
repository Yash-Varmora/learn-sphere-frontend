import React, { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getCourses } from "@/redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Paginate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPages } = useSelector((state) => state.course);
  
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || "1";
  const categoryId = query.get("categoryId");

  useEffect(() => {
    dispatch(getCourses({page:parseInt(page), categoryId}));
  }, [dispatch, page,categoryId]);

  const handlePageChange = (pageNum) => {
    if (pageNum !== page) {
      const newQuery = new URLSearchParams();
      newQuery.set("page", pageNum);
      if (categoryId) {
        newQuery.set("categoryId", categoryId);
      }
      navigate(`/courses?${newQuery.toString()}`);
    }
  };

  const renderPages = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink className="hover:bg-gray-100 hover:cursor-pointer"
              isActive={i.toString() === page}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      pages.push(
        <PaginationItem key="page-1">
          <PaginationLink className="hover:bg-gray-100 hover:cursor-pointer"
            isActive={"1" === page}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (parseInt(page) > 3) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      const startPage = Math.max(2, parseInt(page) - 1);
      const endPage = Math.min(totalPages - 1, parseInt(page) + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink className="hover:bg-gray-100 hover:cursor-pointer"
              isActive={i.toString() === page}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (parseInt(page) < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink className="hover:bg-gray-100 hover:cursor-pointer"
            isActive={totalPages === page}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  }; 

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious 
          aria-disabled={page === "1"}
          className={ `cursor-pointer ${page === "1" && "opacity-50 pointer-events-none"}`}
          onClick={() => handlePageChange(parseInt(page) - 1)}
        />
        {renderPages()}
        <PaginationNext
          aria-disabled={parseInt(page) === totalPages}
          className={ `cursor-pointer ${parseInt(page) === totalPages && "opacity-50 pointer-events-none"}`}
          onClick={() => handlePageChange(parseInt(page) + 1)}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;
