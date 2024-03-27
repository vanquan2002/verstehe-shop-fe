import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";
import { setLayoutResetActions } from "../redux/actions/LayoutActions";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import MenuLayout from "../components/layoutNavBarComponents/MenuLayout";
import Footer from "../components/Footer";
import Header from "./../components/headerComponents/Header";
import Contents from "../components/singleProductComponents/Contents";
import Reviews from "../components/singleProductComponents/Reviews";
import { detailsProduct } from "../redux/actions/ProductActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/ProductConstants";
import RelatedProducts from "./../components/singleProductComponents/RelatedProducts";
import Breadcrumbs from "../components/Breadcrumbs";

const SingleProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const { success: successCreateReview, error: errorCreateReview } =
    productCreateReview;
  const setLayout = useSelector((state) => state.setLayout);
  const { result } = setLayout;
  const resetLayoutHandle = () => {
    dispatch(setLayoutResetActions());
  };

  useEffect(() => {
    if (successCreateReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    if (errorCreateReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(detailsProduct(id));
  }, [dispatch, id, successCreateReview]);

  return (
    <div className="bg-darkPrimary ">
      <div
        className={`transition ${
          result
            ? "translate-x-[-300px] md:translate-x-[-500px] duration-500"
            : "translate-x-0 duration-500"
        }`}
      >
        <div
          className={`z-30 fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 transition-opacity duration-300 ${
            result
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={resetLayoutHandle}
        ></div>
        <Header />
        <>
          <div className="px-5 md:px-12">
            <Breadcrumbs
              offBorderBottom={false}
              textContent="Thông tin sản phẩm"
            />
            <Contents
              id={id}
              loading={loading}
              error={error}
              product={product}
            />
            <Reviews
              id={id}
              product={product}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              loading={loading}
              error={error}
            />
            <RelatedProducts id={id} />
          </div>
        </>
        <Footer />
      </div>

      <SearchLayout result={result === "search" ? true : false} />
      <CartLayout result={result === "cart" ? true : false} />
      <MenuLayout result={result === "menu" ? true : false} />
    </div>
  );
};

export default SingleProductScreen;
