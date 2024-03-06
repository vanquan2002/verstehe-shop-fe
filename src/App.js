import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import LogIn from "./screens/LogIn";
import Register from "./screens/Register";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import "./App.css";
import PrivateRouter from "./PrivateRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/search/:keyword" element={<HomeScreen />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomeScreen />}
          />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart/:id?" element={<CartScreen />} />
          <Route
            path="/profile"
            element={<PrivateRouter comp={<ProfileScreen />} />}
          />
          <Route
            path="/shipping"
            element={<PrivateRouter comp={<ShippingScreen />} />}
          />
          <Route
            path="/payment"
            element={<PrivateRouter comp={<PaymentScreen />} />}
          />
          <Route
            path="/placeorder"
            element={<PrivateRouter comp={<PlaceOrderScreen />} />}
          />
          <Route
            path="/order/:id"
            element={<PrivateRouter comp={<OrderScreen />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
