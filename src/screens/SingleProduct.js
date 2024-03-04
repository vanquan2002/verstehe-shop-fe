import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../redux/actions/ProductActions";
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";
import { Rate } from "antd";
import Header from "./../components/Header";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/ProductConstants";
import moment from "moment";

const SingleProduct = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    success: successCreateReview,
    error: errorCreateReview,
  } = productCreateReview;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const addToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  useEffect(() => {
    if (successCreateReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successCreateReview]);

  return (
    <>
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div>
          <div className="border-2 border-indigo-600 m-2 p-2">
            <img width={500} src={product.image} alt="" />
            <p>{product.name}</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to
            </p>
            <div className="border-2 border-indigo-600 m-2 p-2">
              <div className="border-2 border-indigo-600 m-2 p-2">
                <p>Price</p>
                <span>{product.price}</span>
              </div>
              <div className="border-2 border-indigo-600 m-2 p-2">
                <p>Status</p>
                {product.countInStock > 0 ? (
                  <span>In Stock</span>
                ) : (
                  <span>unavailable</span>
                )}
              </div>
              <div className="border-2 border-indigo-600 m-2 p-2">
                <p>Review</p>
                <Rate allowHalf disabled value={product.rating} />
                <span>{product.numReviews} review</span>
              </div>
              {product.countInStock > 0 && (
                <>
                  <div className="border-2 border-indigo-600 m-2 p-2">
                    <p>Quantity</p>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={addToCartHandle}>ADD TO CART</button>
                </>
              )}
            </div>
          </div>

          <div className="border-2 border-indigo-600 m-2 p-2">
            <div className="border-2 border-indigo-600 m-2 p-2">
              <p>REVIEWS</p>
              {product.reviews.length === 0 ? (
                <Message variant="">No review</Message>
              ) : (
                product.reviews.map((review, i) => (
                  <div key={i} className="border-2 border-indigo-600 m-2 p-2">
                    <h5>{review.name}</h5>
                    <Rate allowHalf disabled value={review.rating} />
                    <h4>{moment(review.createdAt).calendar()}</h4>
                    <div className="border-2 border-indigo-600 m-2 p-2">
                      {review.comment}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-2 border-indigo-600 m-2 p-2">
              <p>WRITE A CUSTOMER REVIEW</p>
              {loadingCreateReview && <Loading />}
              {errorCreateReview && (
                <Message variant="">{errorCreateReview}</Message>
              )}
              {userInfo ? (
                <form className="flex flex-col w-32" onSubmit={submitHandle}>
                  <strong>Rating</strong>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="0">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <strong>Comment</strong>
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    className="border-2 border-indigo-600 m-2 p-2"
                    cols="10"
                    rows="3"
                  ></textarea>
                  <button disabled={loadingCreateReview} type="submit">
                    SUBMIT
                  </button>
                </form>
              ) : (
                <Message variant="">
                  Please{" "}
                  <strong
                    onClick={() => navigate(`/login?redirect=products/${id}`)}
                  >
                    Login
                  </strong>{" "}
                  to write a review
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
