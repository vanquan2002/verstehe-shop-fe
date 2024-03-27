import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Fancybox from "./Fancybox ";
import { styled } from "styled-components";

const ArrowStyled = styled.div`
  z-index: 10;
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.url});
  opacity: 0;
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
  const {
    className,
    style,
    onClick,
    right,
    url,
    isnavigation,
    isprevarrow,
    isnextarrow,
  } = props;
  return (
    <ArrowStyled
      className={className}
      style={{
        ...style,
        display:
          isprevarrow === "true"
            ? "none"
            : isnextarrow === "true"
            ? "none"
            : "block",
        right: right === "right" ? "10px" : "",
        left: right !== "right" ? "10px" : "",
      }}
      onClick={onClick}
      url={url}
      isnavigation={isnavigation}
    />
  );
}

const ImageList = ({ images }) => {
  const [isNavigation, setIsNavigation] = useState(true);
  const [sliderIsActive, setSliderIsActive] = useState(0);

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
    swipeToSlide: true,
    afterChange: function (index) {
      setSliderIsActive(index);
    },
    nextArrow: (
      <SampleArrow
        isnavigation={isNavigation ? "true" : "false"}
        right="right"
        url="/svgs/right-svgrepo-com.svg"
        isnextarrow={sliderIsActive === images?.length - 1 ? "true" : "false"}
      />
    ),
    prevArrow: (
      <SampleArrow
        isnavigation={isNavigation ? "true" : "false"}
        url="/svgs/left-svgrepo-com.svg"
        isprevarrow={sliderIsActive === 0 ? "true" : "false"}
      />
    ),
  };

  return (
    <Fancybox
      options={{
        Carousel: {
          infinite: true,
        },
        Toolbar: {
          display: {
            left: [],
            middle: ["infobar"],
            right: ["iterateZoom", "thumbs", "close"],
          },
        },
        Thumbs: {
          showOnStart: false,
        },
      }}
    >
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Slider {...settings}>
          {images?.map((img, i) => (
            <a data-fancybox="gallery" href={img} key={i}>
              <img src={img} className="w-full" alt="" />
            </a>
          ))}
        </Slider>
      </div>
    </Fancybox>
  );
};

export default ImageList;
