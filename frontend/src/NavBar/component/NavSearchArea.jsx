import React from "react";
import { Form, FormControl, Button } from "react-bootstrap";
const NavSearchArea = () => {
  return (
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  );
};

export default NavSearchArea;
