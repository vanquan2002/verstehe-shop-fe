import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div``;

const Pagination = () => {
  return (
    <div className="flex gap-x-5">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </div>
  );
};

export default Pagination;
