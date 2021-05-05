import React from "react";

const Options = (props) => {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.name}</label>
      <select {...props.register(props.name)} defaultValue="0" id={props.id}>
        <option value="0">please select an option</option>
        <option value="1">1. Hindi Movies</option>
        <option value="2">2. English Movies</option>
        <option value="3">3. Foreign Movies</option>
        <option value="4">4. Animation Movies</option>
        <option value="5">5. English & Foreign Dubbed Movies</option>
        <option value="6">6. South Indian Movies</option>
        <option value="7">7. English and foreign Tv Series</option>
      </select>
    </React.Fragment>
  );
};
export default Options;
