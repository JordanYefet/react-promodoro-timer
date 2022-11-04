import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import ResetButton from "./ResetButton";
import BreakIntervalsIndicator from "./BreakIntervalsIndicator";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";
import { Link } from "react-router-dom";

const red = "#f54e4e";
const green = "#4aec8c";
const blue = "#40a3ff";

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [restart, setRestart] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [breakIntervalsDone, setBreakIntervalsDone] = useState(-1);
  const breakIntervalsDoneRef = useRef(-1); // filled yellow indicators
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      //const nextMode = modeRef.current === "work" ? "break" : "work";
      //debugger;
      let nextMode = "";
      if (modeRef.current === "work") {
        if (breakIntervalsDoneRef.current >= settingsInfo.breakIntervals - 1) {
          nextMode = "longBreak";
        } else nextMode = "break";
      } else nextMode = "work";

      /*       const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60; */
      let nextSeconds = 0;
      if (nextMode === "work") nextSeconds = settingsInfo.workMinutes * 60;
      else if (nextMode === "break")
        nextSeconds = settingsInfo.breakMinutes * 60;
      else nextSeconds = settingsInfo.longBreakMinutes * 60;
      console.log(nextMode);
      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        if (!settingsInfo.autoStart) {
          setIsPaused(true);
          isPausedRef.current = true;
        }
        if (
          modeRef.current === "work" &&
          breakIntervalsDoneRef.current < settingsInfo.breakIntervals
        ) {
          breakIntervalsDoneRef.current = breakIntervalsDoneRef.current + 1;
          setBreakIntervalsDone((prevState) => prevState + 1);
        }
        /*         if (breakIntervalsDoneRef.current === settingsInfo.breakIntervals) {
          console.log("long break activated");
        } */
        if (modeRef.current === "longBreak") {
          setIsPaused(true);
          isPausedRef.current = true;
          breakIntervalsDoneRef.current = -1;
          setBreakIntervalsDone(-1);
        }
        return switchMode();
      }

      tick();
    }, 50);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  /*   const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60; */
  let totalSeconds = 0;
  if (mode === "work") {
    totalSeconds = settingsInfo.workMinutes * 60;
  } else if (mode === "break") {
    totalSeconds = settingsInfo.breakMinutes * 60;
  } else {
    totalSeconds = settingsInfo.longBreakMinutes * 60;
  }
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  console.log(totalSeconds);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <div className="settings-container">
        <Link to="/settings">
          <SettingsButton
            className="settings-btn"
            onClick={() => settingsInfo.setShowSettings(true)}
          />
        </Link>
        <ResetButton className="restart-btn" onClick={() => setRestart(true)} />
      </div>
      <div className="CircularProgressbar">
        <CircularProgressbar
          value={percentage}
          text={minutes + ":" + seconds}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: mode === "work" ? red : mode === "break" ? green : blue,
            tailColor: "rgba(255,255,255,.2)",
          })}
        />
        <BreakIntervalsIndicator breakIntervalsDone={breakIntervalsDone} />
      </div>
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Timer;
