import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
  width: 100%;
  height: 100px;
  padding: 100px 0;
  background: #999;
`;

const CalltoActionSection = () => {
  return (
    <ContainerStyled className="d-flex flex-column justify-content-center align-items-center">
      <h2>Do you need more tips</h2>
      <p>Sign up free and get the latest tips</p>
      <form>
        <input type="email" name="email" placeholder="Your email..." />
        <input type="submit" value="Yes. I want!" name="subscribe" />
      </form>
    </ContainerStyled>
  );
};

export default CalltoActionSection;
