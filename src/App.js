import './App.css';
import React, { useState, useEffect } from 'react';
import { Slider, Button, Typography, Stack } from '@mui/material';

function App() {
  const [distance, setDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevTime => prevTime + 0.1);
      }, 100); // Update elapsed time every 0.1 seconds
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timerRunning]);

  const handleStart = () => {
    setTimerRunning(true);
  };

  const handleStop = () => {
    setTimerRunning(false);
    setDistance(0);
    setElapsedTime(0);
    setSpeed(0);
  };

  const handleSpeedChange = (_event, newSpeed) => {
    setSpeed(newSpeed);
  };

  useEffect(() => {
    // TODO: distance logic here!

    setDistance(prevDistance => prevDistance + 0.01);
  }, [speed, elapsedTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const tenths = Math.floor((time * 10) % 10);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${tenths}`;
  };

  return (
    <div>
      <h1>Distance: {distance.toFixed(2)} miles</h1>
      <h2>Time: {formatTime(elapsedTime)}</h2>
      <Slider value={speed} onChange={handleSpeedChange} min={0} max={12} step={0.5} />
      <Typography>{speed}</Typography>

      <Stack>
        <Button variant="contained" color="primary" onClick={handleStart}>Submit</Button>
        <Button variant="contained" color="secondary" onClick={handleStop}>Stop</Button>
      </Stack>
    </div>
  );
}

export default App;
