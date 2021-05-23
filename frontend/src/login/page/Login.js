import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../shared/context/Auth-context";
import Salam from "../components/salute-emoji.gif";
import "./Login.css";
const Login = () => {
  const auth = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const loginDataHandler = async (data) => {
    const login = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      }
    );
    if (!login.ok) {
      alert("login failed.");
    }
    const loginData = await login.json();

    auth.login(loginData.userId, loginData.token);
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form"
            onSubmit={handleSubmit(loginDataHandler)}
          >
            <span className="login100-form-title p-b-26">
              <img src={Salam} alt="" className="salamemoji" /> সালাম সাব!
            </span>
            <span className="login100-form-title p-b-48">
              <i className="zmdi zmdi-font"></i>
            </span>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid Username is: test"
            >
              <input
                className="input100"
                type="text"
                name="Username"
                {...register("username", { required: true })}
              />
              <span
                className="focus-input100"
                data-placeholder="Username"
              ></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Enter password"
            >
              <span className="btn-show-pass">
                <i className="zmdi zmdi-eye"></i>
              </span>
              <input
                className="input100"
                type="password"
                name="pass"
                {...register("password", { required: true })}
              />
              <span
                className="focus-input100"
                data-placeholder="Password"
              ></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
