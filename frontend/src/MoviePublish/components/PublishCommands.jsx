import React from "react";
import { Container, Card, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLink } from "@fortawesome/free-solid-svg-icons";
const PublishCommands = () => {
  return (
    <Container className="mt-5">
      <h3 className="mt-2 mb-3">All Publish Commands</h3>
      <hr />

      <div>
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
                <FontAwesomeIcon icon={faLink} />
                <span className="ml-2">Catagory</span>
              </InputGroup.Text>
              <FormControl aria-describedby="basic-addon1" />
            </InputGroup>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default PublishCommands;
