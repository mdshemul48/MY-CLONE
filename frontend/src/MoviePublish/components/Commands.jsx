import React from "react";
import { Card, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFolder,
  faLink,
  faFolderMinus,
} from "@fortawesome/free-solid-svg-icons";

const Commands = () => {
  return (
    <div className="pt-3">
      <Card>
        <Card.Header as="h5">Swedish movie</Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faFolder} />
              <span className="ml-2">From</span>
            </InputGroup.Text>
            <FormControl aria-describedby="basic-addon1" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faFolder} />
              <span className="ml-2">To</span>
            </InputGroup.Text>
            <FormControl aria-describedby="basic-addon1" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faLink} />
              <span className="ml-2">Link</span>
            </InputGroup.Text>
            <FormControl aria-describedby="basic-addon1" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faFolderMinus} />
              <span className="ml-2">Catagory</span>
            </InputGroup.Text>
            <FormControl aria-describedby="basic-addon1" />
          </InputGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Commands;
