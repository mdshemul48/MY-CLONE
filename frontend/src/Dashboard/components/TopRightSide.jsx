import { Container } from "react-bootstrap";

import ChartArea from "./ChartArea";
import BotArea from "./BotArea";
const TopRightSide = () => {
  return (
    <Container fluid>
      <ChartArea />
      <BotArea />
    </Container>
  );
};

export default TopRightSide;
