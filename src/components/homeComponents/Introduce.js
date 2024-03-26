import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div``;

const Introduce = () => {
  return (
    <div className="grid grid-cols-1 py-10 md:py-0 bg-whitePrimary md:grid-cols-2 min-h-[100px] md:min-h-[650px]">
      <div className="h-full bg-whitePrimary p-4 md:bg-firePrimary col-span-1 flex flex-row md:flex-col justify-center items-end md:items-center">
        <p className="text-6xl md:text-[9rem] font-extrabold">thg 02</p>
        <p className="text-6xl md:text-[9rem] font-extrabold">-2024</p>
      </div>
      <div className="h-full font-medium md:text-base bg-whitePrimary col-span-1 flex flex-col items-start justify-center py-5 px-8  lg:md:p-20 md:p-12 gap-2 md:gap-6">
        <p className="text-[15px]">
          243.200 giây = 1.720 phút = 512 giờ = 88 ngày = 7 tuần = 3 tháng = 0.3
          năm = 02 - 05/2024
        </p>
        <p className="text-[15px]">
          là tổng thời gian mà VRESTEHE® xuất hiện và tồn tại.
        </p>
        <p>
          Để thống kê tất cả DỰ ÁN từ trước đến nay CHÚNG TÔI giành gần 1 tháng
          để tổng hợp dữ liệu.
        </p>
        <p className="text-[15px]">
          Cảm ơn BẠN đã giành 1 ngày để xem qua lần lượt các DỰ ÁN.
        </p>
        <p className="text-[15px]">—— VRESTEHE® TEAM™OUR STORY</p>
      </div>
    </div>
  );
};

export default Introduce;
