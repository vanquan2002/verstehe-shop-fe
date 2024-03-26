import React from "react";

import bannerTopImg from "../../assets/banner1.webp";
import bannerBottomImg from "../../assets/banner2.webp";

const Banner = ({ positions }) => {
  return (
    <div>
      {positions === "top" ? (
        <img className="w-full" src={bannerTopImg} alt="" />
      ) : (
        <img className="w-full" src={bannerBottomImg} alt="" />
      )}
    </div>
  );
};

export default Banner;
