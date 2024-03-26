import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fancybox from "./Fancybox ";
import { styled } from "styled-components";

const ArrowStyled = styled.div`
  z-index: 10;
  display: block;
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  ${(props) => (props.right === "right" ? "right: 10px;" : "left: 10px;")}
  background-image: url(${(props) => props.url});
  &:before {
    content: "";
  }
  &:hover {
    background-position: center;
    background-size: 40px;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.url});
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

const ImageList = ({ images }) => {
  const [isNavigation, setIsNavigation] = useState(false);
  const handleMouseEnter = () => {
    setIsNavigation(true);
  };
  const handleMouseLeave = () => {
    setIsNavigation(false);
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
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

  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: false,
        },
      }}
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Slider {...settings}>
          {images?.map((img, i) => (
            <a className="" data-fancybox="gallery" href={img} key={i}>
              <img src={img} className="w-full" alt="" />
            </a>
          ))}
        </Slider>
      </div>
    </Fancybox>
  );
};

export default ImageList;
