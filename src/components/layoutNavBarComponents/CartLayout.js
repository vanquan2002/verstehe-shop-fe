import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutActions";

const CartLayout = ({ result }) => {
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
      <div className={`w-[300px] md:w-[500px] h-screen bg-primary`}>
        <div className="flex flex-col items-center pt-32"></div>
      </div>
    </div>
  );
};

export default CartLayout;
