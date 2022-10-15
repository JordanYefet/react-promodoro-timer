import "./App.css";
import Timer from "./Timer";
import Settings from "./Settings";
import { useState } from "react";
import SettingsContext from "./SettingsContext";

function App() {
  const initialStates = {
    workMinutes: 45,
    breakMinutes: 15,
    longBreakMinutes: 30,
    breakIntervals: 4,
    autoStart: true,
  };

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(initialStates.workMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initialStates.breakMinutes);
  const [longBreakMinutes, setLongBreakMinutes] = useState(
    initialStates.longBreakMinutes
  );
  const [breakIntervals, setBreakIntervals] = useState(
    initialStates.breakIntervals
  );
  const [autoStart, setAutoStart] = useState(initialStates.autoStart);

  return (
    <main>
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
          longBreakMinutes,
          setLongBreakMinutes,
          breakIntervals,
          setBreakIntervals,
          initialStates,
          autoStart,
          setAutoStart,
        }}
      >
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
