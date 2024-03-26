import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
import { Badge } from "antd";
import { MdOutlineShoppingBag } from "react-icons/md";
import {
  setLayoutCartActions,
  setLayoutSearchActions,
  setLayoutMenuActions,
} from "./../../redux/actions/LayoutActions";

const MainStyled = styled.div``;

const Header = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const layoutSearchHandle = () => {
    dispatch(setLayoutSearchActions());
  };
  const layoutCartHandle = () => {
    dispatch(setLayoutCartActions());
  };
  const layoutMenuHandle = () => {
    dispatch(setLayoutMenuActions());
  };

  return (
    <MainStyled className={`sticky top-0 z-20`}>
      <div className="flex justify-between bg-whitePrimary items-center md:min-h-16 min-h-16 md:px-10 px-5 sticky top-0 ">
        <div className="flex items-center">
          <p
            className="md:text-5xl text-darkPrimary md:font-extrabold font-bold text-3xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            VERSTEHE
          </p>
        </div>
        <div className="flex justify-between items-center md:gap-6 gap-4">
          <RiSearchLine
            onClick={layoutSearchHandle}
            size="1.5rem"
            className="cursor-pointer text-darkPrimary"
          />
          <Badge
            style={{ background: "rgb(18,18,18)" }}
            count={cartItems.length}
          >
            <MdOutlineShoppingBag
              onClick={layoutCartHandle}
              size="1.5rem"
              className="cursor-pointer text-darkPrimary"
            />
          </Badge>
          <p
            className="cursor-pointer text-darkPrimary"
            onClick={layoutMenuHandle}
          >
            MENU
          </p>
        </div>
      </div>
    </MainStyled>
  );
};

export default Header;
