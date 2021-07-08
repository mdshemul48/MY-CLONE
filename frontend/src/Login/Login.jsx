import React from "react";

import PageTitle from "../Title/PageTitle";
import "./Login.css";
const Login = () => {
  return (
    <>
      <PageTitle>Login</PageTitle>
      <div className="d-flex justify-content-center align-items-center login-full-container">
        <form className="">
          <h4 className="mb-4 text-center Login-text">LOGIN</h4>
          <input
            className="form-control mb-3 p-4"
            type="text"
            Placeholder="Username"
          />
          <input
            className="form-control mb-3 p-4"
            type="password"
            Placeholder="Password"
          />
          <button className="btn btn-dark btn-block">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
