import React from "react";
import { Container } from "react-bootstrap";
import Commands from "./Commands";
const PublishCommands = () => {
  return (
    <Container className="mt-5">
      <h3 className="mt-2 mb-3">All Publish Commands</h3>
      <hr />
      <div>
        <Commands
          name="Swedish movie"
          from="A:\.uploading_1tb\publish\Swedish"
          to="A:\Foreign Language Movies\Sweden"
          link="http://index2.circleftp.net/FILE/Foreign%20Language%20Movies/Sweden"
          catagory="1"
        />
        <Commands
          name="Swedish movie"
          from="A:\.uploading_1tb\publish\Swedish"
          to="A:\Foreign Language Movies\Sweden"
          link="http://index2.circleftp.net/FILE/Foreign%20Language%20Movies/Sweden"
          catagory="3"
        />
        <Commands
          name="Swedish movie"
          from="A:\.uploading_1tb\publish\Swedish"
          to="A:\Foreign Language Movies\Sweden"
          link="http://index2.circleftp.net/FILE/Foreign%20Language%20Movies/Sweden"
          catagory="3"
        />
        <Commands
          name="Swedish movie"
          from="A:\.uploading_1tb\publish\Swedish"
          to="A:\Foreign Language Movies\Sweden"
          link="http://index2.circleftp.net/FILE/Foreign%20Language%20Movies/Sweden"
          catagory="3"
        />
        <Commands
          name="Swedish movie"
          from="A:\.uploading_1tb\publish\Swedish"
          to="A:\Foreign Language Movies\Sweden"
          link="http://index2.circleftp.net/FILE/Foreign%20Language%20Movies/Sweden"
          catagory="3"
        />
      </div>
    </Container>
  );
};

export default PublishCommands;
