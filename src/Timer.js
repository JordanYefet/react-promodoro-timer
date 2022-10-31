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

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [restart, setRestart] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(3);
  const breakIntervalsDone = useRef(-1); // filled yellow indicators
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

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
        if (modeRef.current === "break" && breakIntervalsDone.current <= settingsInfo.breakIntervals){
          console.log(breakIntervalsDone.current)
          breakIntervalsDone.current = breakIntervalsDone.current + 1;
        }
        return switchMode();
      }

      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

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
            pathColor: mode === "work" ? red : green,
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
      <div>
        <h1>Work Minutes: {settingsInfo.workMinutes}</h1>
        <h1>Break Minutes: {settingsInfo.breakMinutes}</h1>
      </div>
    </div>
  );
}

export default Timer;
