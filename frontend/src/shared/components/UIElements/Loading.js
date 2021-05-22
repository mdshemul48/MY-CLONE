import React from "react";
import Dog from "./dog.gif";
import "./Loading.css";
const Loading = (props) => {
  return (
    <div className="loader">
      <img src={Dog} alt="" className="dogImg" />
    </div>
  );
};

export default Loading;
