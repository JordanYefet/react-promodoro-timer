import "./App.css";
import Timer from "./Timer";
import Settings from "./Settings";
import { useState } from "react";
import SettingsContext from "./SettingsContext";
import { Route, Routes } from "react-router-dom";

function App() {
  const initialStates = {
    workMinutes: 1,
    breakMinutes: 1,
    longBreakMinutes: 30,
    breakIntervals: 2,
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
  const [key, setKey] = useState(Math.random);

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
          setKey,
        }}
      >
        {/* {showSettings ? <Settings /> : <Timer />} */}
        <Routes>
          <Route path="/" element={<Timer />}></Route>
          <Route path="/settings" element={<Settings key={key} />}></Route>
        </Routes>
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
