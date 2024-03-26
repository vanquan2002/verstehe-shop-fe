import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutActions";

const MenuLayout = ({ result }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const layoutSearchHandle = () => {
    dispatch(setLayoutResetActions());
  };

  return (
    <div
      className={`fixed top-0 right-0 transition ${
        result
          ? "translate-x-0 duration-500"
          : "translate-x-[500px] duration-500"
      } `}
    >
      <div className={`w-[300px] md:w-[500px] h-screen bg-whitePrimary`}>
        <div className="flex flex-col items-center pt-32">
          <p onClick={layoutSearchHandle}>Close menu layout</p>
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;
