import React, { useEffect } from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/actions/ProductActions";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
const ContainerStyled = styled.div``;

const Contents = ({ keyword, pageNumber }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="p-5">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="grid grid-cols-3">
          {products.map((product, i) => (
            <div
              onClick={() => navigate(`/products/${product._id}`)}
              className={`p-4 border border-gray-400 ${
                i % 3 === 0 ? "" : "border-l-0"
              } ${
                i >= products.length - (products.length % 3)
                  ? `border-b-${products.length % 3 === 1 ? "l" : "r"}-0`
                  : ""
              } ${i < products.length - 3 ? "border-b-0" : ""}`}
              key={i}
            >
              <img className="w-full" src={product.image} alt="" />
              <p className="font-extrabold text-xl uppercase text-whitePrimary">
                {product.name}
              </p>
              <p className="text-whitePrimary text-sm">{product.description}</p>
              <p className="text-firePrimary text-xl font-extrabold text-right">
                {product.price} VND
              </p>
            </div>
          ))}
        </div>
      )}
      <Pagination page={page} pages={pages} keyword={keyword} />
    </div>
  );
};

export default Contents;
