import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import botStatusMethod from "../../Store/asyncMethods/botStatusMethod";
import BotStatus from "./BotStatus";

const BotArea = () => {
  const dispatch = useDispatch();
  const [downloader, uploader, publisher] = useSelector(
    (state) => state?.botStatusReducer?.botStatus
  );

  useEffect(() => {
    dispatch(botStatusMethod());
  }, [dispatch]);

  useEffect(() => {
    const fetchTimeOut = setTimeout(() => {
      dispatch(botStatusMethod());
    }, 5000);

    return () => clearTimeout(fetchTimeOut);
  });

  return (
    <Container fluid className="mt-lg-3  mb-5 order-sm-2">
      <h5>Bot Status</h5>
      {downloader && <BotStatus bot={publisher} />}
      {downloader && <BotStatus bot={uploader} />}
      {downloader && <BotStatus bot={downloader} />}
    </Container>
  );
};

export default BotArea;
