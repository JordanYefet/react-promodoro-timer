import ReactSlider from "react-slider";
import "./slider.css";
import SettingsContext from "./SettingsContext";
import React, { useContext, useState, useRef, useEffect } from "react";
import BackButton from "./BackButton";
import ReactSliderComponent from "./ReactSliderComponent";

function Settings() {
  const settingsInfo = useContext(SettingsContext);

  const workMinutesRef = useRef(settingsInfo.workMinutes);
  const breakMinutesRef = useRef(settingsInfo.breakMinutes);
  const longBreakMinutesRef = useRef(settingsInfo.longBreakMinutes);
  const breakIntervalsRef = useRef(settingsInfo.breakIntervals);
  //const autoStartRef = useRef(settingsInfo.autoStart);

  const [autoStart, setAutoStart] = useState(settingsInfo.autoStart);

  function resetBtn() {
    settingsInfo.setWorkMinutes(settingsInfo.initialStates.workMinutes);
    settingsInfo.setBreakMinutes(settingsInfo.initialStates.breakMinutes);
    settingsInfo.setLongBreakMinutes(
      settingsInfo.initialStates.longBreakMinutes
    );
    settingsInfo.setBreakIntervals(settingsInfo.initialStates.breakIntervals);
    settingsInfo.setAutoStart(settingsInfo.initialStates.autoStart);
    //setReset(true);

    settingsInfo.setShowSettings(false);
  }

  function applyBtn() {
    settingsInfo.setWorkMinutes(workMinutesRef.current);
    settingsInfo.setBreakMinutes(breakMinutesRef.current);
    settingsInfo.setLongBreakMinutes(longBreakMinutesRef.current);
    settingsInfo.setBreakIntervals(breakIntervalsRef.current);
    settingsInfo.setAutoStart(autoStart);

    settingsInfo.setShowSettings(false);
  }

  useEffect(() => {
    console.log("re-rendered");
  });

  return (
    <div style={{ textAlign: "left" }}>
      <div>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
      <ReactSliderComponent
        value={workMinutesRef.current}
        setValue={(e) => {
          workMinutesRef.current = e;
        }}
        color=""
        min={1}
        max={120}
      />
      <ReactSliderComponent
        value={breakMinutesRef.current}
        setValue={(e) => {
          breakMinutesRef.current = e;
        }}
        color="green"
        min={1}
        max={120}
      />
      <ReactSliderComponent
        value={longBreakMinutesRef.current}
        setValue={(e) => {
          longBreakMinutesRef.current = e;
        }}
        color="blue"
        min={1}
        max={120}
      />
      <ReactSliderComponent
        value={breakIntervalsRef.current}
        setValue={(e) => {
          breakIntervalsRef.current = e;
        }}
        color="yellow"
        min={1}
        max={5}
      />
      <div className="flex auto-start">
        <label>Auto break start?</label>
        <input
          type="checkbox"
          checked={autoStart}
          onChange={() => setAutoStart(!autoStart)}
        />
      </div>
      <div className="flex settings-btn-container">
        <button className="btn-with-text" onClick={resetBtn}>
          Reset
        </button>
        <button className="btn-with-text" onClick={applyBtn}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default Settings;
