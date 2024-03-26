import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./../redux/actions/CartActions";
import Header from "./../components/Header";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  const checkOutHandle = () => {
    navigate("/login?redirect=shipping");
  };
  const removeFromCartHandle = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      {cartItems.length === 0 ? (
        <p>Empty - Shopping now</p>
      ) : (
        <div className="">
          <p onClick={() => navigate("/cart")}>
            Total Cart Products: {cartItems.length}
          </p>
          {cartItems.map((item, i) => (
            <div key={i}>
              <div className="border-2 border-indigo-600 m-2 p-2">
                <span onClick={() => removeFromCartHandle(item.product)}>
                  X
                </span>
                <img width={500} src={item.image} alt="" />
                <p
                  onClick={() => navigate(`/products/${item.product}`)}
                  className="border-2 border-indigo-600 m-2 p-2"
                >
                  {item.name}
                </p>
                <div className="border-2 border-indigo-600 m-2 p-2">
                  <p>QUANTITY: </p>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border-2 border-indigo-600 m-2 p-2">
                  <p>PRICE:</p>
                  <p>{item.price}</p>
                </div>
              </div>
            </div>
          ))}
          <p>TOTAL: {total}</p>
          <div className="border-2 border-indigo-600 m-2 p-2">
            <button>continue to shopping</button>--------------
            {total > 0 && <button onClick={checkOutHandle}>checkout</button>}
          </div>
        </div>
      )}
    </>
  );
};

export default CartScreen;
