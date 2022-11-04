import React, { useEffect, useState, useContext } from "react";
import SettingsContext from "./SettingsContext";

function BreakIntervalsIndicator(props) {
  const settingsInfo = useContext(SettingsContext);
  const [indicatorList, setIndicatorList] = useState(
    [...Array(settingsInfo.breakIntervals).keys()].map((i) => i + 1)
  );

  //A better approach is to build an array of empty indicators
  //and then fill them one by one, instead of creating the whole list over and over again
  function indicatorBuilder(list) {
    return list.map((_, index) => {
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
  }, [props.breakIntervalsDone]);

  return (
    <div className="flex breakIntervalsIndicatorContainer">{indicatorList}</div>
  );
}

export default BreakIntervalsIndicator;
