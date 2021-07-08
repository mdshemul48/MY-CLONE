import React, { useState } from "react";
import { useDispatch } from "react-redux";

import PageTitle from "../Title/PageTitle";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const formChangeHandler = (event) => {};
  const LoginHandler = (event) => {};
  return (
    <>
      <PageTitle>Login</PageTitle>
      <div className="d-flex justify-content-center align-items-center login-full-container">
        <form>
          <h4 className="mb-4 text-center Login-text">LOGIN</h4>
          <input
            className="form-control mb-3 p-4"
            type="text"
            Placeholder="Username"
            name="username"
          />
          <input
            className="form-control mb-3 p-4"
            type="password"
            Placeholder="Password"
            name="password"
          />
          <button className="btn btn-dark btn-block">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
