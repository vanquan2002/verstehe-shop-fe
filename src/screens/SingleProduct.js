import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../redux/actions/ProductActions";
import Loading from "../components/loadingError/Loading";
import Message from "../components/loadingError/Error";
import { Rate } from "antd";
import Header from "./../components/Header";

const SingleProduct = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const navigate = useNavigate();

  const addToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

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
                <span>21 review</span>
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
              <div className="border-2 border-indigo-600 m-2 p-2">
                <h5>Nam Nguyen</h5>
                <div>(rating)</div>
                <h4>07/02/2024</h4>
              </div>

              <div className="border-2 border-indigo-600 m-2 p-2">
                <h5>Thanh Long</h5>
                <div>(rating)</div>
                <h4>15/06/2023</h4>
              </div>
            </div>

            <div className="border-2 border-indigo-600 m-2 p-2">
              <p>WRITE A CUSTOMER REVIEW</p>
              <h4>Rating</h4>
              <select>
                <option>Poor</option>
                <option>Fair</option>
                <option>Good</option>
                <option>Very Good</option>
                <option>Excellent</option>
              </select>
              <h4>Comment</h4>
              <button>SUBMIT</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
