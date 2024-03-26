import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState("");

  useEffect(() => {
    const url = window.location.pathname;
    const arlSplit = url.split("/").filter((part) => part !== "");
  }, []);

  return (
    <div className="border-b-[1px] text-sm uppercase flex items-center justify-start gap-3 border-whitePrimary border-opacity-50 pt-12 pb-5">
      <p
        onClick={() => navigate("/")}
        className="text-whitePrimary text-opacity-50 font-semibold cursor-pointer"
      >
        Trang chủ
      </p>
      <div className="flex items-center gap-[1px]">
        <p className="text-white font-extrabold">/</p>
        <p className="text-white font-extrabold">/</p>
      </div>
      <p className="text-white font-bold">Thông tin sản phẩm</p>
    </div>
  );
};

export default Breadcrumbs;
