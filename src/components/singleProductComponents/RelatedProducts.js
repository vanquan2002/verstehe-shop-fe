import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { relatedProducts } from "./../../redux/actions/ProductActions";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./../loadingError/Loading";
import Message from "./../loadingError/Error";
import { useNavigate } from "react-router-dom";

const ContainerStyled = styled.div`
  .slider-container {
  }
`;

const ArrowStyled = styled.div`
  z-index: 10;
  display: block;
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  background-color: rgb(225, 220, 224);
  border-radius: 100%;
  ${(props) => (props.right === "right" ? "right: -15px;" : "left: -15px;")}
  background-image: url(${(props) => props.url});
  &:before {
    content: "";
  }
  &:hover {
    background-position: center;
    background-size: 40px;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.url});
    background-color: rgb(225, 220, 224);
  }
  transition: 0.4s;
  ${(props) => (props.isnavigation === "true" ? "opacity: 1;" : "opacity: 0;")}
`;
function SampleArrow(props) {
  const { className, style, onClick, right, url, isnavigation } = props;
  return (
    <ArrowStyled
      className={className}
      style={{ ...style }}
      onClick={onClick}
      right={right}
      url={url}
      isnavigation={isnavigation}
    />
  );
}

const RelatedProducts = ({ id }) => {
  const [isNavigation, setIsNavigation] = useState(false);

  const handleMouseEnter = () => {
    setIsNavigation(true);
  };
  const handleMouseLeave = () => {
    setIsNavigation(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsRelated = useSelector((state) => state.productsRelated);
  const { products, loading, error } = productsRelated;

  const formatDataWithBr = (text) => {
    const sentences = text.split(".");
    const firstSentence = sentences[0];
    return (
      <div className="text-whitePrimary text-sm truncate">{firstSentence}</div>
    );
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <SampleArrow
        isnavigation={isNavigation ? "true" : "false"}
        right="right"
        url="/svgs/right-svgrepo-com.svg"
      />
    ),
    prevArrow: (
      <SampleArrow
        isnavigation={isNavigation ? "true" : "false"}
        url="/svgs/left-svgrepo-com.svg"
      />
    ),
  };

  useEffect(() => {
    dispatch(relatedProducts(id));
  }, [dispatch, id]);

  return (
    <ContainerStyled className="mb-7 mt-10">
      <p className="uppercase font-semibold text-whitePrimary text-lg ">
        Các sản phẩm liên quan
      </p>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="slider-container mt-3 border border-whitePrimary border-opacity-50"
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Slider {...settings}>
            {products.map((product, i) => (
              <div
                style={{ margin: "10px" }}
                onClick={() => navigate(`/products/${product._id}`)}
                className={`p-4 ${
                  products.length - 1 === i ? "border-r-0" : "border-r"
                }  border-whitePrimary border-opacity-50 `}
                key={i}
              >
                <img src={product.images?.[0]} alt="" />
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
          </Slider>
        )}
      </div>
    </ContainerStyled>
  );
};

export default RelatedProducts;
