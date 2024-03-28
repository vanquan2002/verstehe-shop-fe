import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Contents from "../components/homeComponents/Contents";
import Introduce from "../components/homeComponents/Introduce";
import Header from "../components/headerComponents/Header";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import { useSelector, useDispatch } from "react-redux";
import { setLayoutResetActions } from "./../redux/actions/LayoutActions";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import MenuLayout from "./../components/layoutNavBarComponents/MenuLayout";
import Marquees from "./../components/homeComponents/Marquees";
import Banner from "./../components/homeComponents/Banner";
import { listProduct } from "../redux/actions/ProductActions";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const setLayout = useSelector((state) => state.setLayout);
  const { result } = setLayout;
  const resetLayoutHandle = () => {
    dispatch(setLayoutResetActions());
  };

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <div className="bg-darkPrimary">
      <div
        className={`transition ${
          result
            ? "translate-x-[-300px] md:translate-x-[-500px] duration-500"
            : "translate-x-0 duration-500"
        }`}
      >
        <div
          className={`z-30 fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 transition-opacity duration-300 ${
            result
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={resetLayoutHandle}
        ></div>
        <Header />
        <div>
          <Marquees />
          <Banner positions={"top"} />
          <Marquees />
          <Contents loading={loading} error={error} products={products} />
          <Banner positions={"bottom"} />
          <Introduce />
        </div>
        <Footer />
      </div>

      <SearchLayout result={result === "search" ? true : false} />
      <CartLayout result={result === "cart" ? true : false} />
      <MenuLayout result={result === "menu" ? true : false} />
    </div>
  );
}
