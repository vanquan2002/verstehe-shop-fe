import React from "react";
import styled from "styled-components";
import ProfileTabs from "./ProfileTabs";

const ContainerStyled = styled.div`
  width: 100%;
  height: 100px;
  background: #999;
`;

const Orders = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>paid</td>
              <td>Dec 12 2024</td>
              <td>$234</td>
            </tr>
            <tr>
              <td>2</td>
              <td>paid</td>
              <td>Dec 12 2024</td>
              <td>$234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
