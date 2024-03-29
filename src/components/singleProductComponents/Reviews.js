import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createProductReview,
  detailsProduct,
} from "./../../redux/actions/ProductActions";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import { Rate } from "antd";
import { styled } from "styled-components";
import { Avatar } from "antd";
import moment from "moment";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/ProductConstants";

const RateStyled = styled(Rate)`
  .ant-rate-star-second {
    color: #999;
  }
  .ant-rate-star {
    color: rgb(237, 119, 25);
  }
`;

const Reviews = ({ id, product }) => {
  const desc = ["Quá tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    success: successCreateReview,
    error: errorCreateReview,
  } = productCreateReview;
  const submitReviewHandle = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [lineCountElement, setLineCountElement] = useState([]);
  const handleToggleExpand = (index) => {
    setExpandedIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((idx) => idx !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };
  const formatDataWithBr = (content, index) => {
    const isExpanded = expandedIndices.includes(index);
    return (
      <div>
        <div
          id={`comment-${index}`}
          className={`${
            lineCountElement[index] > 3 && !isExpanded && "line-clamp-3"
          }`}
        >
          <p className="text-darkPrimary font-medium text-[15px]">{content}</p>
        </div>
        {lineCountElement[index] > 3 && (
          <button
            onClick={() => handleToggleExpand(index)}
            className="underline text-darkPrimary text-[15px] font-medium cursor-pointer"
          >
            {isExpanded ? "Rút gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const elements = document.querySelectorAll("[id^='comment']");
      if (elements) {
        let newElements = [];
        elements.forEach((element) => {
          const elementHeight = element.scrollHeight;
          const lineHeight = parseFloat(
            window.getComputedStyle(element).lineHeight
          );
          const calculatedLineCount = Math.round(elementHeight / lineHeight);
          newElements.push(calculatedLineCount);
        });
        setLineCountElement(newElements);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (successCreateReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(detailsProduct(id));
    }
    if (errorCreateReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [successCreateReview, id, dispatch]);

  return (
    <div className="mt-10 p-8 bg-whitePrimary">
      <div className="mb-7">
        <p className="text-darkPrimary font-semibold uppercase">
          Đánh giá sản phẩm này:
        </p>
        {loadingCreateReview && <Loading />}
        {errorCreateReview && <Message>{errorCreateReview}</Message>}
        {userInfo ? (
          <form className="flex flex-col " onSubmit={submitReviewHandle}>
            <div className="mt-3 flex items-center h-8 gap-4">
              <p className="font-normal text-[15px]">Rating:</p>
              <RateStyled tooltips={desc} onChange={setRating} value={rating} />
              {rating ? <span>{desc[rating - 1]}</span> : null}
            </div>
            <div className="relative w-full mt-3">
              <div className="relative w-full min-w-[200px]">
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  className="peer h-full min-h-[100px] w-full resize-none border border-darkPrimary border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-darkPrimary placeholder-shown:border-t-darkPrimary focus:border-2 focus:border-darkPrimary focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  value={comment}
                ></textarea>
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:border-t before:border-l before:border-darkPrimary before:transition-all after:pointer-events-none after:mt-[6px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:border-t after:border-r after:border-darkPrimary after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Comment
                </label>
              </div>
              <div className="flex w-full justify-end py-1.5">
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 font-sans text-xs font-bold text-center text-darkPrimary uppercase align-middle transition-all select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => setComment("")}
                  >
                    Cancel
                  </button>
                  <button
                    className="select-none bg-darkPrimary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-whitePrimary shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    disabled={loadingCreateReview}
                    type="submit"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <Message variant="">
            Please{" "}
            <strong onClick={() => navigate(`/login?redirect=products/${id}`)}>
              Login
            </strong>{" "}
            to write a review
          </Message>
        )}
      </div>
      <div>
        <div className="text-darkPrimary">
          {product.reviews.length === 0 ? (
            <p className="mb-4">No review</p>
          ) : (
            product.reviews.map((review, i) => (
              <div key={i} className="">
                <div className="flex items-center gap-3">
                  <Avatar
                    style={{
                      backgroundColor: "#333",
                      color: "rgb(237,119,25)",
                    }}
                    size={40}
                  >
                    {review.name.substring(0, 2)}
                  </Avatar>
                  <div>
                    <p className="font-medium text-darkPrimary truncate overflow-hidden w-[300px] lg:w-[500px] mb-1">
                      {review.name}
                    </p>
                    <RateStyled allowHalf disabled value={review.rating} />
                  </div>
                </div>
                <div className="flex justify-between items-start gap-3 px-5 py-3">
                  <div className="w-4/5">
                    <div>{formatDataWithBr(review.comment, i)}</div>
                  </div>
                  <div className="flex justify-end w-1/5">
                    <p className="text-sm text-right text-darkPrimary text-opacity-50">
                      {moment(review.createdAt).calendar()}
                    </p>
                  </div>
                </div>
                <div
                  className={`${
                    product.reviews.length - 1 > i &&
                    "border-b border-darkPrimary border-opacity-50 mb-6 mt-2"
                  }`}
                ></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
