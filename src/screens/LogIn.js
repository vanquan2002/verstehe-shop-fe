import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./../redux/actions/UserActions";
import Message from "./../components/loadingError/Error";
import Loading from "./../components/loadingError/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useLocation().search.split("=")[1] || "";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div>
      <Header />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      <form
        onSubmit={(e) => submitHandle(e)}
        className="border-2 border-indigo-600 m-2 p-2"
      >
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-2 border-indigo-600 m-2 p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p
          onClick={() =>
            navigate(redirect ? `/register?redirect=${redirect}` : "/register")
          }
        >
          Create account
        </p>
      </form>
    </div>
  );
};

export default Login;
