import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
const SubmitForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    catagory: "",
    folderInput: "",
    folderOutput: "",
    folderLink: "",
  });

  const onChangeHandler = (event) => {
    setFormState((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  console.table(formState);

  return (
    <div className="bg-light rounded mt-5 p-4">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the Name"
              name="name"
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="catagory">
            <Form.Label>Movie Catagory</Form.Label>
            <Form.Control
              as="select"
              defaultValue="0"
              name="catagory"
              onChange={onChangeHandler}
            >
              <option value="0">please select an option</option>
              <option value="1">1. Hindi Movies</option>
              <option value="2">2. English Movies</option>
              <option value="3">3. Foreign Movies</option>
              <option value="4">4. Animation Movies</option>
              <option value="5">5. English &amp; Foreign Dubbed Movies</option>
              <option value="6">6. South Indian Movies</option>
              <option value="7">7. English and foreign Tv Series</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="folderInput">
          <Form.Label>Path From</Form.Label>
          <Form.Control
            type="text"
            placeholder="A:\...."
            name="folderInput"
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="folderOutput">
          <Form.Label>Path To</Form.Label>
          <Form.Control
            type="text"
            placeholder="A:\...."
            name="folderOutput"
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Form.Group controlId="linkTo">
          <Form.Label>Link To</Form.Label>
          <Form.Control
            type="text"
            placeholder="http://..."
            name="folderLink"
            onChange={onChangeHandler}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SubmitForm;
