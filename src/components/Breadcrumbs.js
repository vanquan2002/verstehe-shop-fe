import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ offBorderBottom, textContent }) => {
  const navigate = useNavigate();
  const [path, setPath] = useState("");

  useEffect(() => {
    const url = window.location.pathname;
    const arlSplit = url.split("/").filter((part) => part !== "");
  }, []);

  return (
    <div
      className={`text-sm uppercase flex items-center justify-start gap-3 pt-12 ${
        !offBorderBottom &&
        "border-b border-whitePrimary border-opacity-50 pb-5"
      }`}
    >
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
      <p className="text-white font-bold">{textContent}</p>
    </div>
  );
};

export default Breadcrumbs;
