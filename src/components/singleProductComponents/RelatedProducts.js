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
  width: 55px;
  height: 55px;
  background-color: rgb(225, 220, 224);
  border-radius: 100%;
  ${(props) => (props.right === "right" ? "right: -28px;" : "left: -28px;")}
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
`;
function SampleArrow(props) {
  const { className, style, onClick, right, url } = props;
  return (
    <ArrowStyled
      className={className}
      style={{ ...style }}
      onClick={onClick}
      right={right}
      url={url}
    />
  );
}

const RelatedProducts = ({ id }) => {
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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleArrow right="right" url="/svgs/right-svgrepo-com.svg" />,
    prevArrow: <SampleArrow url="/svgs/left-svgrepo-com.svg" />,
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(relatedProducts(id));
  }, [dispatch, id]);

  return (
    <ContainerStyled className="mb-7 mt-10">
      <p className="uppercase font-semibold text-whitePrimary text-lg ">
        Các sản phẩm liên quan
      </p>
      <div
        className={`slider-container mt-3 ${
          windowWidth > 1024 && "border border-whitePrimary border-opacity-50"
        }`}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <div>
            {windowWidth > 1024 ? (
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
            ) : (
              <div className="">
                {products.map((product, i) => (
                  <div
                    onClick={() => navigate(`/products/${product._id}`)}
                    className={`p-4 border border-whitePrimary border-opacity-50 lg:border-l-0 lg:border-b ${
                      i < products.length - 1 ? "border-b-0" : ""
                    }`}
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
          </div>
        )}
      </div>
    </ContainerStyled>
  );
};

export default RelatedProducts;
