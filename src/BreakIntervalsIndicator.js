import React from "react";
import { useContext } from "react";
import SettingsContext from "./SettingsContext";

function BreakIntervalsIndicator(props) {
  const settingsInfo = useContext(SettingsContext);

  let indicatorList = [];
  indicatorList = [...Array(settingsInfo.breakIntervals)].map((index) => (
    <div key={index} className="breakIntervalsIndicator"></div>
  ));

  return (
    <div className="flex breakIntervalsIndicatorContainer">{indicatorList}</div>
  );
}

export default BreakIntervalsIndicator;
