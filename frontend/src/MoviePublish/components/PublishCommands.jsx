import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCommands } from "../../Store/asyncMethods/publisherCommands";

import { Container } from "react-bootstrap";
import Commands from "./Commands";

const PublishCommands = () => {
  const publishCommands = useSelector(
    (state) => state.publishCommands.commands
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCommands());
  }, [dispatch]);
  return (
    <Container className="mt-5">
      <h3 className="mt-2 mb-3">All Publish Commands</h3>
      <hr />
      <div>
        {publishCommands.map((command) => {
          return (
            <Commands
              key={command._id}
              id={command._id}
              name={command.note}
              from={command.input}
              to={command.output}
              link={command.link}
              catagory={command.category}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PublishCommands;
