import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLayoutResetActions } from "../../redux/actions/LayoutActions";
import { addToCart, removeFromCart } from "../../redux/actions/CartActions";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const CartLayout = ({ result }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(0);
  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandle = () => {
    navigate("/login?redirect=shipping");
  };
  const layoutCartHandle = () => {
    dispatch(setLayoutResetActions());
  };
  const navigateHandle = (product) => {
    dispatch(setLayoutResetActions());
    navigate(`/products/${product}`);
  };
  const containerCartRef = useRef(null);
  const preventWindowScroll = (e) => {
    if (containerCartRef.current?.contains(e.target)) {
      e.preventDefault();
    }
  };
  window.addEventListener("wheel", preventWindowScroll, { passive: false });
  const wheelCart = (e) => {
    const deltaY = e.deltaY;
    const scrollSpeed = 1;
    containerCartRef.current.scrollTop += deltaY * scrollSpeed;
  };

  return (
    <div
      className={`fixed top-0 right-0 transition ${
        result
          ? "translate-x-0 duration-500"
          : "translate-x-[500px] duration-500"
      } `}
    >
      <div
        ref={containerCartRef}
        onWheel={(e) => wheelCart(e)}
        className={`w-[300px] md:w-[500px] h-screen p-14 bg-whitePrimary scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-white overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-10">
          <p className="text-darkPrimary font-medium uppercase">Giỏ hàng</p>
          <MdClose
            onClick={layoutCartHandle}
            size="2.1rem"
            className="cursor-pointer"
          />
        </div>
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center mt-40">
            <p className="text-darkPrimary text-opacity-45">
              Chưa có sản phẩm nào cả
            </p>
          </div>
        ) : (
          <div className="">
            {cartItems.map((item, i) => (
              <div
                className={`flex items-center gap-5 ${
                  cartItems.length - 1 > i &&
                  "border-b border-darkPrimary border-opacity-15 pb-6 mb-6"
                }`}
                key={i}
              >
                <img
                  onClick={() => navigateHandle(item.product)}
                  className="w-20 cursor-pointer"
                  src={item.image}
                  alt=""
                />
                <div className="flex items-start gap-5">
                  <div className="flex flex-col gap-1">
                    <p
                      onClick={() => navigateHandle(item.product)}
                      className="line-clamp-2 font-semibold text-sm cursor-pointer"
                    >
                      {item.name}
                    </p>
                    <div className="flex justify-between items-center pr-7">
                      <p className="text-sm text-darkPrimary text-opacity-60 font-medium">
                        Size: <span className="uppercase">{item.size}</span>
                      </p>
                      <p className="text-sm text-darkPrimary text-opacity-60 font-medium">
                        {item.color}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pr-7">
                      <p className="text-sm text-darkPrimary text-opacity-60 font-medium">
                        Số lượng: {item.qty}
                      </p>
                      <p className="text-sm text-darkPrimary text-opacity-60 font-semibold">
                        {item.price} VND
                      </p>
                    </div>
                  </div>
                  <div
                    className="p-1 rounded-full flex justify-center items-center border border-darkPrimary"
                    onClick={() => removeFromCartHandle(item.product)}
                  >
                    <MdClose size="1rem" className="cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between mt-10 pt-4 border-t-2 border-darkPrimary">
              <p className="uppercase text-base text-darkPrimary">
                Tổng tiền:{" "}
              </p>
              <p className="text-base text-darkPrimary">{total} VND</p>
            </div>
            <div className="flex items-center justify-between mt-7 gap-5">
              <button
                onClick={() => navigate("/cart")}
                className="w-full px-6 py-4 bg-firePrimary font-semibold text-sm uppercase text-darkPrimary"
              >
                Xem giỏ hàng
              </button>
              <button
                className="w-full px-6 py-4 bg-firePrimary font-semibold text-sm uppercase text-darkPrimary"
                onClick={checkOutHandle}
              >
                Thanh toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartLayout;
