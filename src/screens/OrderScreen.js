import React, { useEffect } from "react";
import Header from "./../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "./../redux/actions/OrderActions";
import Message from "./../components/loadingError/Error";
import Loading from "./../components/loadingError/Loading";
import { moment } from "moment";

const OrderScreen = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id, dispatch]);

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          <div className="flex border-2 border-indigo-600 m-2 p-2">
            <div className="border-2 border-indigo-600 m-2 p-2">
              <h4>Customer:</h4>
              <p>{order.user.name}</p>
              <a href={`mailto:${order.user.email}`}></a>
              <p>{order.user.email}</p>
            </div>
            <div className="border-2 border-indigo-600 m-2 p-2">
              <h4>Order info:</h4>
              <p>Shipping: {order.shippingAddress.country}</p>
              <p>Pay method: {order.paymentMethod}</p>
              <hr />
              {order.isPaid ? (
                <p>Paid on {moment(order.paidAt).calendar}</p>
              ) : (
                <p>Not Paid</p>
              )}
            </div>
            <div className="border-2 border-indigo-600 m-2 p-2">
              <h4>Deliver to:</h4>
              Address: {order.shippingAddress.city},{" "}
              {order.shippingAddress.address},{" "}
              {order.shippingAddress.postalCode}
              <hr />
              {order.isDelivered ? (
                <p>Delivered on {moment(order.deliveredAt).calendar}</p>
              ) : (
                <p>Not Delivered</p>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 border-2 border-indigo-600 m-2 p-2">
              {order.orderItems.length === 0 ? (
                <Message variant="alert-danger">Your order is empty</Message>
              ) : (
                order.orderItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex border-2 border-indigo-600 m-2 p-2"
                  >
                    <p>{item.name}</p>
                    <div className="border-2 border-indigo-600 m-2 p-2">
                      <p>PRICE</p>
                      <p>{item.price}</p>
                    </div>
                    <div className="border-2 border-indigo-600 m-2 p-2">
                      <p>QUANTITY</p>
                      <p>{item.qty}</p>
                    </div>
                    <div className="border-2 border-indigo-600 m-2 p-2">
                      <p>SUBTOTAL</p>
                      <p>{item.price * item.qty}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="w-1/7 border-2 border-indigo-600 m-2 p-2">
              <div className="border-2 border-indigo-600 m-2 p-2">
                <p>Products: ${order.itemsPrice}</p>
                <p>Shipping: ${order.shippingPrice}</p>
                <p>Tax: ${order.taxPrice}</p>
                <p>Total: ${order.totalPrice}</p>
              </div>
              <div>PayPal</div>
              <div>PayPal</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderScreen;
