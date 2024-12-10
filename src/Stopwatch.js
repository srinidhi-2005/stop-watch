import React, { useState, useRef } from "react";
import "./Stopwatch.css";
import { FaPlay, FaPause, FaRedo, FaStopwatch } from 'react-icons/fa';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`stopwatch ${darkMode ? 'dark' : ''}`}>
      <h1><FaStopwatch /> Stopwatch</h1>
      <div className="timer" style={{ fontFamily: 'Playfair Display, serif' }}>{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startTimer} disabled={isRunning}><FaPlay /> Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}><FaPause /> Pause</button>
        <button onClick={resetTimer}><FaRedo /> Reset</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
        <button onClick={toggleDarkMode} className="mode-toggle">🌙</button>
      </div>
      {laps.length > 0 && (
        <div className="laps">
          <h2>Lap Times</h2>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
