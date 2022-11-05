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
import AnimatedPage from "./AnimatedPage";

const colors = {
  red: "#f54e4e",
  green: "#4aec8c",
  blue: "#40a3ff",
};

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const initialStates = {
    restart: false,
    isPaused: true,
    mode: "work",
    secondsLeft: settingsInfo.workMinutes * 60,
    breakIntervalsDone: -1,
  };
  const [restart, setRestart] = useState(initialStates.restart);
  const [isPaused, setIsPaused] = useState(initialStates.isPaused);
  const [mode, setMode] = useState(initialStates.mode); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(initialStates.secondsLeft);
  //const [isCacheMem, setIsCacheMeme] = useState(false);
  const [breakIntervalsDone, setBreakIntervalsDone] = useState(
    initialStates.breakIntervalsDone
  );
  const breakIntervalsDoneRef = useRef(breakIntervalsDone); // filled yellow indicators
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  /*     useEffect(() => {
    setIsPaused(JSON.parse(window.localStorage.getItem("isPaused")));
    setSecondsLeft(JSON.parse(window.localStorage.getItem("secondsLeft")));
    isPausedRef.current = isPaused;
    secondsLeftRef.current = secondsLeft;
  }, []);

  useEffect(() => {
    window.localStorage.setItem("isPaused", isPaused);
    window.localStorage.setItem("secondsLeft", secondsLeft);
  }, [isPaused, secondsLeft]); */

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    setIsPaused(initialStates.isPaused);
    isPausedRef.current = isPaused;
    setBreakIntervalsDone(initialStates.breakIntervalsDone);
    breakIntervalsDoneRef.current = breakIntervalsDone;
    setMode(initialStates.mode);
    modeRef.current = mode;
    setSecondsLeft(initialStates.secondsLeft);
    secondsLeftRef.current = secondsLeft;
    setRestart(false);
  }, [restart]);

  useEffect(() => {
    function switchMode() {
      let nextMode = "";
      if (modeRef.current === "work") {
        if (breakIntervalsDoneRef.current >= settingsInfo.breakIntervals - 1) {
          nextMode = "longBreak";
        } else nextMode = "break";
      } else nextMode = "work";

      let nextSeconds = 0;
      if (nextMode === "work") nextSeconds = settingsInfo.workMinutes * 60;
      else if (nextMode === "break")
        nextSeconds = settingsInfo.breakMinutes * 60;
      else nextSeconds = settingsInfo.longBreakMinutes * 60;
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
        if (modeRef.current === "longBreak") {
          setRestart(true);
        }
        return switchMode();
      }

      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  let totalSeconds = 0;
  if (mode === "work") {
    totalSeconds = settingsInfo.workMinutes * 60;
  } else if (mode === "break") {
    totalSeconds = settingsInfo.breakMinutes * 60;
  } else {
    totalSeconds = settingsInfo.longBreakMinutes * 60;
  }
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <AnimatedPage page="timer">
      <div>
        <div className="settings-container">
          <Link to="/settings">
            <SettingsButton
              className="settings-btn settings-reset-btns"
              onClick={() => settingsInfo.setShowSettings(true)}
            />
          </Link>
          <ResetButton
            className="reset-btn settings-reset-btns"
            onClick={() => setRestart(true)}
          />
        </div>
        <div className="CircularProgressbar">
          <CircularProgressbar
            value={percentage}
            text={minutes + ":" + seconds}
            styles={buildStyles({
              textColor: "#fff",
              pathColor:
                mode === "work"
                  ? colors.red
                  : mode === "break"
                  ? colors.green
                  : colors.blue,
              tailColor: "rgba(255,255,255,.2)",
            })}
          />
          <BreakIntervalsIndicator breakIntervalsDone={breakIntervalsDone} />
        </div>
        <div style={{ marginTop: "20px" }}>
          {isPaused ? (
            <PlayButton
              className="play-pause-btns play-btn"
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <PauseButton
              className="play-pause-btns pause-btn"
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Timer;
