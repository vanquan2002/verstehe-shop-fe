import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/UserActions";
import Message from "../components/loadingError/Error";
import Loading from "../components/loadingError/Loading";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirect = useLocation().search.split("=")[1] || "";
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-indigo-600 m-2 p-2"
          type="text"
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-2 border-indigo-600 m-2 p-2"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-indigo-600 m-2 p-2"
          type="password"
          placeholder="Password"
        />
        <button type="submit">REGISTER</button>
        <p
          onClick={() =>
            navigate(redirect ? `/login?redirect=${redirect}` : "/login")
          }
        >
          I Have Account Login
        </p>
      </form>
    </div>
  );
};

export default Register;
