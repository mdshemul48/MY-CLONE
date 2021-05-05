import React from "react";

const Input = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.element}>{props.label}</label>
      <input
        {...props.register(props.name)}
        type={props.type || "text"}
        id={props.element}
        placeholder={props.placeholder}
      />
    </React.Fragment>
  );
};

export default Input;