import React from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { FaAnglesRight } from "react-icons/fa6";

const Contents = ({ loading, error, products }) => {
  const navigate = useNavigate();
  const formatDataWithBr = (text) => {
    const sentences = text.split(".");
    const firstSentence = sentences[0];
    return (
      <div className="text-whitePrimary text-sm truncate">{firstSentence}</div>
    );
  };

  return (
    <div className="p-5 my-7">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <div className="flex items-center justify-center p-2 md:p-5 border-t border-r border-l border-whitePrimary border-opacity-50">
            <p className="text-center uppercase font-semibold text-2xl md:text-4xl lg:text-5xl text-whitePrimary">
              Verstehe store all product
            </p>
          </div>
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
          <div className="flex items-center justify-end gap-1 cursor-pointer mt-3">
            <p
              onClick={() => navigate("/products")}
              className="uppercase font-semibold text-sm text-whitePrimary"
            >
              Xem thêm
            </p>
            <FaAnglesRight size="0.8rem" className="text-whitePrimary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contents;
