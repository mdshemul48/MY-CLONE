import React from "react";
import { Card, InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch } from "react-redux";
import { commandRemover } from "../../Store/asyncMethods/publisherCommands";
import {
  faFolder,
  faLink,
  faFolderMinus,
} from "@fortawesome/free-solid-svg-icons";

const Commands = (props) => {
  const dispatch = useDispatch();
  const { name, from, to, link, catagory, id } = props;

  const allCatagory = [
    "",
    "1. Hindi Movies",
    "2. English Movies",
    "3. Foreign Movies",
    "4. Animation Movies",
    "5. English &amp; Foreign Dubbed Movies",
    "6. South Indian Movies",
    "7. English and foreign Tv Series",
  ];

  const catagorySelected = allCatagory[+catagory];
  const deleteCommandHandler = () => {
    dispatch(commandRemover(id));
  };
  return (
    <div className="pt-3">
      <Card>
        <Card.Header as="h5">{name}</Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faFolder} />
              <span className="ml-2">From</span>
            </InputGroup.Text>
            <FormControl aria-describedby="basic-addon1" defaultValue={from} />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faFolder} />
              <span className="ml-2">To</span>
            </InputGroup.Text>
            <FormControl aria-describedby="basic-addon1" defaultValue={to} />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faLink} />
              <span className="ml-2">Link</span>
            </InputGroup.Text>
            <FormControl aria-describedby="basic-addon1" defaultValue={link} />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FontAwesomeIcon icon={faFolderMinus} />
              <span className="ml-2">Catagory</span>
            </InputGroup.Text>
            <FormControl
              aria-describedby="basic-addon1"
              defaultValue={catagorySelected}
            />
          </InputGroup>

          <Button variant="danger" onClick={deleteCommandHandler}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Commands;
