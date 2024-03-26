import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { Rate } from "antd";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/CartActions";
import ImageList from "./ImageList";
import { setLayoutCartActions } from "../../redux/actions/LayoutActions";
import Loading from "./../loadingError/Loading";
import Message from "../loadingError/Error";

const RateStyled = styled(Rate)`
  .ant-rate-star-second {
    color: #999;
  }
  .ant-rate-star {
    color: rgb(237, 119, 25);
  }
`;

const Contents = ({ id, product, loading, error }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("s");
  const dispatch = useDispatch();
  const addToCartHandle = (e) => {
    e.preventDefault();
    dispatch(addToCart(id, qty, size));
    dispatch(setLayoutCartActions());
  };
  const increment = () => {
    setQty(qty + 1);
  };
  const decrement = () => {
    setQty(qty - 1);
  };
  const [isShowBtnMore, setIsShowBtnMore] = useState({ description: false });
  const [lineCountElement, setLineCountElement] = useState(0);
  const checkLineElementDescriptionRef = useRef(null);
  const formatDataWithBr = (content) => {
    return (
      <div>
        <div
          ref={checkLineElementDescriptionRef}
          className={`${
            lineCountElement > 3 && !isShowBtnMore.description && "line-clamp-3"
          }`}
        >
          {content?.split(".").map((sentence, index, array) => (
            <p className="text-white font-medium text-[15px]" key={index}>
              {sentence}
              {index !== array.length - 1 && <br />}
            </p>
          ))}
        </div>
        {lineCountElement > 3 && (
          <button
            onClick={() =>
              setIsShowBtnMore((prev) => ({
                ...prev,
                description: !isShowBtnMore.description,
              }))
            }
            className="underline text-white text-[15px] font-medium cursor-pointer"
          >
            {isShowBtnMore.description ? "Rút gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    setQty(1);
    setSize("s");
    if (checkLineElementDescriptionRef.current) {
      const lineHeight = parseFloat(
        window.getComputedStyle(checkLineElementDescriptionRef.current)
          .lineHeight
      );
      const elementHeight = checkLineElementDescriptionRef.current.clientHeight;
      const calculatedLineCount = Math.round(elementHeight / lineHeight);
      setLineCountElement(calculatedLineCount);
    }
  }, [checkLineElementDescriptionRef, product?.description]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="col-span-1 z-0">
            <ImageList images={product.images} />
          </div>
          <div className="col-span-1">
            <p className="text-whitePrimary opacity-90 font-bold text-2xl line-clamp-2 mb-4">
              {product.name}{" "}
              {product.countInStock === 0 && (
                <span className="text-darkPrimary text-[10px] ml-3 px-2 py-1 bg-yellow-400 uppercase font-semibold">
                  Hết hàng
                </span>
              )}
            </p>
            <p className="text-2xl font-bold text-firePrimary ml-4 mb-8">
              {product.price} VND
            </p>
            <div className="mb-12">
              <div className="flex items-end">
                <p className="w-full uppercase text-white font-medium">Size:</p>
                <div className="flex gap-6 w-full justify-start">
                  {product.sizes?.map((item, i) => (
                    <div
                      key={i}
                      className={`cursor-pointer flex justify-center items-center ${
                        item === size ? "bg-whitePrimary" : "bg-darkPrimary"
                      } border-[1px] border-whitePrimary border-opacity-50 w-7 h-7`}
                    >
                      <button
                        onClick={() => setSize(item)}
                        className={`uppercase ${
                          item === size
                            ? "text-darkPrimary"
                            : "text-whitePrimary"
                        }`}
                      >
                        {item}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <p className="cursor-pointer underline text-[13px] mt-1 text-whitePrimary opacity-75">
                Hướng dẫn chọn size
              </p>
            </div>
            <div className="flex mb-8 text-whitePrimary">
              <div className="w-full col-span-1">
                <div
                  className={`flex items-center ${
                    product.countInStock === 0 &&
                    "opacity-30 pointer-events-none"
                  }`}
                >
                  <button
                    className={`${
                      qty === 1 &&
                      product.countInStock !== 0 &&
                      "opacity-30 pointer-events-none"
                    } flex cursor-pointer w-12 h-12 justify-center items-center border-[1px] border-whitePrimary border-opacity-50`}
                    onClick={decrement}
                  >
                    <AiOutlineMinus size="1.5rem" />
                  </button>
                  <div className="flex w-12 h-12 justify-center items-center">
                    <p className="text-lg font-semibold">{qty}</p>
                  </div>
                  <button
                    className={`${
                      qty === product.countInStock &&
                      "opacity-30 pointer-events-none"
                    } flex cursor-pointer w-12 h-12 justify-center items-center border-[1px] border-whitePrimary border-opacity-50`}
                    onClick={increment}
                  >
                    <AiOutlinePlus size="1.5rem" />
                  </button>
                </div>
                <p className="text-[13px] mt-2 text-whitePrimary opacity-75">
                  Sản phẩm còn trong kho: {product.countInStock}
                </p>
              </div>
              <div
                onClick={addToCartHandle}
                className={`w-full h-12 pl-[-6rem] ${
                  product.countInStock === 0 && "opacity-50 pointer-events-none"
                } bg-firePrimary font-bold cursor-pointer text-base text-darkPrimary flex justify-center items-center`}
              >
                <p className="uppercase">Thêm vào giỏ</p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <div className="w-full">
                <p className="text-white uppercase font-medium">Tags:</p>
              </div>
              <div className="w-full">
                <p className="text-white uppercase font-medium">
                  Pre-oder 7 ngày
                </p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <div className="w-full">
                <p className="text-white uppercase font-medium">Màu:</p>
              </div>
              <div className="w-full">
                <p className="text-white uppercase font-medium">
                  {product.color}
                </p>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <div className="w-full">
                <p className="text-white uppercase font-medium">Mô tả:</p>
              </div>
              <div className="w-full">
                {formatDataWithBr(product.description)}
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-full">
                <p className="text-white uppercase font-medium">Review:</p>
              </div>
              <div className="w-full flex items-center gap-3">
                <RateStyled allowHalf disabled value={product.rating} />
                <p className="text-white font-medium">
                  ( {product.numReviews} review )
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contents;
