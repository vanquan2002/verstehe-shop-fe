import React from "react";
import Footer from "../components/Footer";
import Contents from "../components/homeComponents/Contents";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import { useParams } from "react-router-dom";
import Header from "../components/headerComponents/Header";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import { useSelector, useDispatch } from "react-redux";
import { setLayoutResetActions } from "./../redux/actions/LayoutActions";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import MenuLayout from "./../components/layoutNavBarComponents/MenuLayout";
import Marquees from "./../components/homeComponents/Marquees";
import Banner from "./../components/homeComponents/Banner";

export default function HomeScreen() {
  const { keyword } = useParams();
  const { pageNumber } = useParams();

  const setLayout = useSelector((state) => state.setLayout);
  const { result } = setLayout;

  const dispatch = useDispatch();

  const layoutSearchHandle = () => {
    dispatch(setLayoutResetActions());
  };

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
          className={`z-20 fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 transition-opacity duration-300 ${
            result
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={layoutSearchHandle}
        ></div>
        <Header />
        <Marquees />
        <Banner />
        <Marquees />

        <Contents pageNumber={pageNumber} keyword={keyword} />
        {/* <CalltoActionSection /> */}
        {/* <ContactInfo /> */}
        {/* <Footer /> */}
      </div>

      <SearchLayout result={result === "search" ? true : false} />
      <CartLayout result={result === "cart" ? true : false} />
      <MenuLayout result={result === "menu" ? true : false} />
    </div>
  );
}
