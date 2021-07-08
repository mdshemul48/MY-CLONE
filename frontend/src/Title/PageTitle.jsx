import React from "react";
import { Helmet } from "react-helmet";
const PageTitle = (props) => {
  return (
    <Helmet>
      <title>{props.children} | MyClone</title>
    </Helmet>
  );
};

export default PageTitle;
