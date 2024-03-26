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

  const formatDataWithBr = (text) => {
    const sentences = text.split(".");
    const firstSentence = sentences[0];
    return (
      <div className="text-whitePrimary text-sm truncate">{firstSentence}</div>
    );
  };

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="p-5 my-7">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {products.map((product, i) => (
            <div
              onClick={() => navigate(`/products/${product._id}`)}
              className={`p-4 border border-whitePrimary border-opacity-50 ${
                i % 3 === 0 ? "" : "md:border-l-0"
              } ${i < products.length - 1 ? "border-b-0 md:border-b" : ""}`}
              key={i}
            >
              <img className="w-full" src={product.images?.[0]} alt="" />
              <p className="font-extrabold text-xl uppercase line-clamp-2 text-whitePrimary">
                {product.name}
              </p>
              <div className="my-2">
                {formatDataWithBr(product.description)}
              </div>
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
