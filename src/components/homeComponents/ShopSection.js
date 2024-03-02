import React, { useEffect } from "react";
import styled from "styled-components";
import Pagination from "../homeComponents/Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/actions/ProductActions";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
const ContainerStyled = styled.div``;

const ShopSection = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <div className="">
      <div className="flex w-full flex-wrap">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          products.map((product, i) => (
            <div
              onClick={() => navigate(`products/${product._id}`)}
              className="flex w-3/12 flex-col items-center border-2 border-indigo-600 p-2"
              key={i}
            >
              <img src={product.image} alt="" />
              <p className="">{product.name}</p>
              <p>Rating: {product.rating}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default ShopSection;
