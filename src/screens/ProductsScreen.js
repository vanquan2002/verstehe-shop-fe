import Footer from "../components/Footer";
import Header from "../components/headerComponents/Header";
import CartLayout from "../components/layoutNavBarComponents/CartLayout";
import MenuLayout from "../components/layoutNavBarComponents/MenuLayout";
import SearchLayout from "../components/layoutNavBarComponents/SearchLayout";
import { setLayoutResetActions } from "../redux/actions/LayoutActions";
import Contents from "./../components/productsComponents/Contents";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect } from "react";
import { listProduct } from "../redux/actions/ProductActions";
import Pagination from "../components/productsComponents/Pagination";

const ProductsScreen = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  const setLayout = useSelector((state) => state.setLayout);
  const { result } = setLayout;
  const dispatch = useDispatch();
  const resetLayoutHandle = () => {
    dispatch(setLayoutResetActions());
  };

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

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
        <div className="px-5">
          <Breadcrumbs offBorderBottom={true} textContent="Tất cả sản phẩm" />
          <Contents loading={loading} error={error} products={products} />
          <Pagination page={page} pages={pages} keyword={keyword} />
        </div>
        <Footer />
      </div>

      <SearchLayout result={result === "search" ? true : false} />
      <CartLayout result={result === "cart" ? true : false} />
      <MenuLayout result={result === "menu" ? true : false} />
    </div>
  );
};

export default ProductsScreen;
