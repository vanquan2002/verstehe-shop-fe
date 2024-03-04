import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/UserActions";

const ContainerStyled = styled.div``;

const Header = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const logoutHandle = () => {
    dispatch(logout());
  };
  const [keyword, setKeyword] = useState("");
  const submitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <div className="flex-col">
      <div className="flex justify-between px-48">
        <div className="flex">
          <p>+255 768 890</p>
          <p>info@zpunet.com</p>
        </div>
        <div className="flex gap-x-4">
          <p>fb</p>
          <p>in</p>
          <p>yu</p>
          <p>pi</p>
        </div>
      </div>
      <div className="flex justify-between px-48 border-2 border-indigo-600 m-2 p-2">
        <p onClick={() => navigate("/")}>LOGO</p>
        <form onSubmit={submitHandle}>
          <input
            onChange={(e) => setKeyword(e.target.value)}
            className="border-2 border-indigo-600 m-2 p-2"
            type="text"
            placeholder="Search..."
          />
          {/* <input type="submit" value="Search" name="search" /> */}
        </form>
        <div className="flex gap-x-4 ">
          {userInfo ? (
            <div className="border-2 border-indigo-600 m-2 p-2">
              <p>Hi {userInfo.name}</p>
              <p onClick={() => navigate("/profile")}>Profile</p>
              <p onClick={logoutHandle}>Logout</p>
            </div>
          ) : (
            <div className="border-2 border-indigo-600 m-2 p-2">
              <p onClick={() => navigate("/login")}>Login</p>
              <p onClick={() => navigate("/register")}>Register</p>
            </div>
          )}
          <p className="flex gap-x-4 " onClick={() => navigate("/cart")}>
            cart-{cartItems.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
