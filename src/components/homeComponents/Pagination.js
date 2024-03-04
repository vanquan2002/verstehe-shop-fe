import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ContainerStyled = styled.div``;

const Pagination = ({ page, pages, keyword = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-x-5">
      {pages > 1 &&
        [...Array(pages).keys()].map((x) => (
          <div
            onClick={() =>
              navigate(
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              )
            }
            key={x + 1}
          >
            {x + 1}
          </div>
        ))}
    </div>
  );
};

export default Pagination;
