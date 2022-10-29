import "./slider.css";
import SettingsContext from "./SettingsContext";
import React, { useContext, useState, useRef, useEffect } from "react";
import BackButton from "./BackButton";
import ReactSliderComponent from "./ReactSliderComponent";
import { Link } from "react-router-dom";

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  const [reset, setReset] = useState(false);
  const workMinutesRef = useRef(settingsInfo.workMinutes);
  const breakMinutesRef = useRef(settingsInfo.breakMinutes);
  const longBreakMinutesRef = useRef(settingsInfo.longBreakMinutes);
  const breakIntervalsRef = useRef(settingsInfo.breakIntervals);
  const [autoStart, setAutoStart] = useState(settingsInfo.autoStart);

  function resetBtn() {
    settingsInfo.setWorkMinutes(settingsInfo.initialStates.workMinutes);
    settingsInfo.setBreakMinutes(settingsInfo.initialStates.breakMinutes);
    settingsInfo.setLongBreakMinutes(
      settingsInfo.initialStates.longBreakMinutes
    );
    settingsInfo.setBreakIntervals(settingsInfo.initialStates.breakIntervals);
    settingsInfo.setAutoStart(settingsInfo.initialStates.autoStart);
    workMinutesRef.current = settingsInfo.initialStates.workMinutes;
    breakMinutesRef.current = settingsInfo.initialStates.breakMinutes;
    longBreakMinutesRef.current = settingsInfo.initialStates.longBreakMinutes;
    breakIntervalsRef.current = settingsInfo.initialStates.breakIntervals;

    //For remounting the component without actually refreshing the page (without using states)
    settingsInfo.setKey(Math.random);
  }

  function applyBtn() {
    settingsInfo.setWorkMinutes(workMinutesRef.current);
    settingsInfo.setBreakMinutes(breakMinutesRef.current);
    settingsInfo.setLongBreakMinutes(longBreakMinutesRef.current);
    settingsInfo.setBreakIntervals(breakIntervalsRef.current);
    settingsInfo.setAutoStart(autoStart);

    //settingsInfo.setShowSettings(false);
  }

  useEffect(() => {
    console.log("re-rendered");
    setReset(false);
  }, [reset]);

  return (
    <div style={{ textAlign: "left" }}>
      <Link to="/">
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </Link>
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
        <Link to="/settings">
          <button
            className="btn-with-text"
            onClick={() => {
              resetBtn();
              setReset(true);
            }}
          >
            Reset
          </button>
        </Link>
        <Link to="/">
          <button className="btn-with-text" onClick={applyBtn}>
            Apply
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Settings;
