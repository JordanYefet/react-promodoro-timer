import ReactSlider from "react-slider";
import "./slider.css";
import SettingsContext from "./SettingsContext";
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import BackButton from "./BackButton";
import ReactSliderComponent from "./ReactSliderComponent";

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  const workMinutesRef = useRef(settingsInfo.workMinutes);

  /* const breakMinutesRef = useRef(settingsInfo.breakMinutes);
  const longBreakMinutesRef = useRef(settingsInfo.longBreakMinutes);
  const breakIntervalsRef = useRef(settingsInfo.breakIntervals);
  const autoStartRef = useRef(settingsInfo.autoStart); */
  const [tempWorkMinutes, setTempWorkMinutes] = useState(
    settingsInfo.workMinutes
  );
  const [tempBreakMinutes, setTempBreakMinutes] = useState(
    settingsInfo.breakMinutes
  );
  const [tempLongBreakMinutes, setTempLongBreakMinutes] = useState(
    settingsInfo.longBreakMinutes
  );
  const [tempBreakIntervals, setTempBreakIntervals] = useState(
    settingsInfo.breakIntervals
  );
  const [tempAutoStart, setTempAutoStart] = useState(settingsInfo.autoStart);

  function resetBtn() {
    setTempWorkMinutes(settingsInfo.initialStates.workMinutes);
    setTempBreakMinutes(settingsInfo.initialStates.breakMinutes);
    setTempLongBreakMinutes(settingsInfo.initialStates.longBreakMinutes);
    setTempBreakIntervals(settingsInfo.initialStates.breakIntervals);
    setTempAutoStart(settingsInfo.initialStates.autoStart);
    /*     workMinutesRef.current = settingsInfo.initialStates.workMinutes;
    breakMinutesRef.current = settingsInfo.initialStates.breakMinutes;
    longBreakMinutesRef.current = settingsInfo.initialStates.longBreakMinutes;
    breakIntervalsRef.current = settingsInfo.initialStates.breakIntervals;
    autoStartRef.current = settingsInfo.initialStates.autoStart; */
  }

  function applyBtn() {
    settingsInfo.setWorkMinutes(workMinutesRef.current);
    //settingsInfo.setWorkMinutes(tempWorkMinutes);
    settingsInfo.setBreakMinutes(tempBreakMinutes);
    settingsInfo.setLongBreakMinutes(tempLongBreakMinutes);
    settingsInfo.setBreakIntervals(tempBreakIntervals);
    settingsInfo.setAutoStart(tempAutoStart);

    /*     settingsInfo.setWorkMinutes(workMinutesRef);
    settingsInfo.setBreakMinutes(breakMinutesRef);
    settingsInfo.setLongBreakMinutes(longBreakMinutesRef);
    settingsInfo.setBreakIntervals(breakIntervalsRef);
    settingsInfo.setAutoStart(tempAutoStart); */
    settingsInfo.setShowSettings(false);
  }
  useEffect(() => {
    console.log("rendered the element");
    //console.log(workMinutesRef);
  });

  return (
    <div style={{ textAlign: "left" }}>
      <div>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
      <ReactSliderComponent
        value={workMinutesRef.current}
        setValue={(e) => (workMinutesRef.current = e)}
        color=""
      />
      {/*       <label>work: {tempWorkMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={tempWorkMinutes}
        onChange={(newValue) => setTempWorkMinutes(newValue)}
        min={1}
        max={120}
      /> */}
      <label>break: {tempBreakMinutes}:00</label>
      <ReactSlider
        className={"slider green"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={tempBreakMinutes}
        onChange={(newValue) => setTempBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>long break: {tempLongBreakMinutes}:00</label>
      <ReactSlider
        className={"slider blue"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={tempLongBreakMinutes}
        onChange={(newValue) => setTempLongBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break intervals: {tempBreakIntervals}</label>
      <ReactSlider
        className={"slider yellow"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={tempBreakIntervals}
        onChange={(newValue) => setTempBreakIntervals(newValue)}
        min={1}
        max={5}
      />
      <div className="flex auto-start">
        <label>Auto break start?</label>
        <input
          type="checkbox"
          checked={tempAutoStart}
          onChange={() => setTempAutoStart(!tempAutoStart)}
        />
      </div>
      <div className="flex settings-btn-container">
        <button
          className="btn-with-text"
          onClick={() => {
            resetBtn();
          }}
        >
          Reset
        </button>
        <button
          className="btn-with-text"
          onClick={() => {
            applyBtn();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default Settings;
