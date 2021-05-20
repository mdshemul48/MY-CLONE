import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import Loading from "../../shared/components/UIElements/Loading";
import Title from "../../shared/components/UIElements/Title";
// time differences
import "./BotStatus.css";
const timeDifferences = (time1, time2) => {
  let diff = (time1.getTime() - time2.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
};

const BotStatus = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const fetchbotStatus = async () => {
        const fetchData = await fetch("http://localhost:5000/api/bot-status/");
        const botJsonData = await fetchData.json();
        setData(botJsonData);
      };
      fetchbotStatus();
    }, 5000);
    return () => clearTimeout(timeoutId);
  });
  if (!data) {
    return (
      <div className="botLoading">
        <Loading />
      </div>
    );
  }
  return (
    <div className={"botMain"}>
      <Title className="bot-title">Bot Status</Title>
      {data.botData.map((bot) => {
        return (
          <h4 className="botStatus" key={bot._id}>
            <div className={`dot ${!bot.StoppedTime && "green"}`}></div>
            Bot Name: {bot.botName} || Status:{" "}
            {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)} ||
            Starting Time: {dateFormat(bot.StartingTime, "h:MM:ss TT")}
            {bot.StoppedTime && (
              <>
                {" "}
                || end Time: {dateFormat(bot.StoppedTime, "h:MM:ss TT")} <br />
                <br />
                Total Work Time:{" "}
                {timeDifferences(
                  new Date(bot.StoppedTime),
                  new Date(bot.StartingTime)
                )}
                Min || Next Run:{" "}
                {dateFormat(
                  new Date(bot.StoppedTime).getTime() + 1 * 60 * 60 * 1000,
                  "h:MM:ss TT"
                )}
              </>
            )}
            <br /> _____________
          </h4>
        );
      })}
    </div>
  );
};

export default BotStatus;
