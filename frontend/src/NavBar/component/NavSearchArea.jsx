import React from "react";
import { Form, FormControl } from "react-bootstrap";

const NavSearchArea = () => {
  return (
    <Form inline>
      <FormControl
        type="text"
        placeholder="Search Movies"
        className="mr-sm-2"
      />
    </Form>
  );
};

export default NavSearchArea;
