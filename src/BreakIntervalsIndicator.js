import React, { useEffect, useState } from "react";
import { useContext } from "react";
import SettingsContext from "./SettingsContext";

function BreakIntervalsIndicator() {
  const settingsInfo = useContext(SettingsContext);
  const [indicatorList, setIndicatorList] = useState(
    [...Array(settingsInfo.breakIntervals).keys()].map((i) => i + 1)
  );

  const currentBreak = 2;

  function kl(list) {
    return list.map((index) => {
      if (currentBreak >= index) {
        return (
          <div
            key={index}
            className="breakIntervalsIndicator breakIntervalsIndicatorFinished"
          ></div>
        );
      } else {
        return <div key={index} className="breakIntervalsIndicator"></div>;
      }
    });
  }

  useEffect(() => {
    setIndicatorList(kl(indicatorList));
    console.log(indicatorList);
  }, [settingsInfo.breakIntervals]);

  return (
    <div className="flex breakIntervalsIndicatorContainer">{indicatorList}</div>
  );
}

export default BreakIntervalsIndicator;
