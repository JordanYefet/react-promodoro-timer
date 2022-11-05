import "./App.css";
import Timer from "./Timer";
import Settings from "./Settings";
import { useState } from "react";
import SettingsContext from "./SettingsContext";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

function App() {
  const initialStates = {
    workMinutes: 30,
    breakMinutes: 5,
    longBreakMinutes: 30,
    breakIntervals: 4,
    autoStart: false,
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
  const location = useLocation();

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
        <AnimatePresence mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Timer />}></Route>
            <Route path="/settings" element={<Settings key={key} />}></Route>
          </Routes>
        </AnimatePresence>
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
