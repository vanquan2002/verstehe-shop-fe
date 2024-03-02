import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
  width: 100%;
  height: 100px;
  padding: 100px 250px;
`;

const ContactInfo = () => {
  return (
    <ContainerStyled className="d-flex justify-content-between align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h5>Call Us 24x7</h5>
        <p>0736 230 063</p>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h5>Headquarter</h5>
        <p>Arusha Njiro Pepsi</p>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h5>Fax</h5>
        <p>0736 230 063</p>
      </div>
    </ContainerStyled>
  );
};

export default ContactInfo;
