import React, { useEffect, useState, useContext } from "react";
import SettingsContext from "./SettingsContext";

function BreakIntervalsIndicator(props) {
  const settingsInfo = useContext(SettingsContext);
  const [indicatorList, setIndicatorList] = useState(
    [...Array(settingsInfo.breakIntervals).keys()].map((i) => i + 1)
  );
  //const [breakIntervalsDone, setBreakIntervalsDone] = useState(2);

  function indicatorBuilder(list) {
    return list.map((index) => {
      const randKey = Math.round(Math.random() * 1000);
      if (props.breakIntervalsDone >= index) {
        return (
          <div
            key={randKey}
            className="breakIntervalsIndicator breakIntervalsIndicatorFinished"
          ></div>
        );
      } else {
        return <div key={randKey} className="breakIntervalsIndicator"></div>;
      }
    });
  }

  useEffect(() => {
    setIndicatorList(indicatorBuilder(indicatorList));
    console.log(props.breakIntervalsDone);
  }, [props.breakIntervalsDone]);

  return (
    <div className="flex breakIntervalsIndicatorContainer">{indicatorList}</div>
  );
}

export default BreakIntervalsIndicator;
