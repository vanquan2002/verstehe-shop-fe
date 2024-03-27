import React from "react";
import { useNavigate } from "react-router-dom";

const Pagination = ({ page, pages, keyword }) => {
  const navigate = useNavigate();

  const handlePageClick = (newPage) => {
    const route = keyword
      ? `/products/search/${keyword}/page/${newPage}`
      : `/products/page/${newPage}`;
    navigate(route);
  };

  return (
    pages > 1 && (
      <div className="flex justify-center items-center gap-4 mt-6">
        <div
          onClick={() => handlePageClick(Math.max(1, page - 1))}
          className="text-firePrimary cursor-pointer"
        >
          pre
        </div>
        {Array.from({ length: pages }, (_, x) => x + 1).map((x) => (
          <div
            key={x + 1}
            onClick={() => handlePageClick(x)}
            className="text-firePrimary cursor-pointer"
          >
            <p
              className={`${
                x === page && "font-bold border-firePrimary border-b-2"
              }`}
            >
              {x}
            </p>
          </div>
        ))}
        <div
          onClick={() => handlePageClick(Math.min(pages, page + 1))}
          className="text-firePrimary cursor-pointer"
        >
          nex
        </div>
      </div>
    )
  );
};

export default Pagination;
