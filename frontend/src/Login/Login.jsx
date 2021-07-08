import React, { useState } from "react";
import { useDispatch } from "react-redux";

import PageTitle from "../Title/PageTitle";
import { loginMethod } from "../Store/asyncMethods/authMethods";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const formChangeHandler = (event) => {
    setFormState((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginMethod(formState));
  };

  return (
    <>
      <PageTitle>Login</PageTitle>
      <div className="d-flex justify-content-center align-items-center login-full-container">
        <form onSubmit={loginSubmitHandler}>
          <h4 className="mb-4 text-center Login-text">LOGIN</h4>
          <input
            className="form-control mb-3 p-4"
            type="text"
            placeholder="Username"
            name="username"
            onChange={formChangeHandler}
          />
          <input
            className="form-control mb-3 p-4"
            type="password"
            placeholder="Password"
            name="password"
            onChange={formChangeHandler}
          />
          <button className="btn btn-dark btn-block">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
