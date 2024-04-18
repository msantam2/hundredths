import './App.css';

import React, { useState, useEffect } from 'react';
import { Slider, Button, Typography, Grid } from '@mui/material';

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
    setDistance((prevDistance) => {
      const newDistance = ((speed / 3600) * elapsedTime).toFixed(3)
      const newDistanceTrimmed = newDistance.slice(0, newDistance.lastIndexOf('.') + 3);
      return parseFloat(newDistanceTrimmed);
    }
  )}, [speed, elapsedTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const tenths = Math.floor((time * 10) % 10);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${tenths}`;
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Typography style={{ fontWeight: "bold" }} variant="h4" align="center">Distance: {distance} miles</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">Time: {formatTime(elapsedTime)}</Typography>
      </Grid>
      <Grid style={{ margin: "0 auto" }} item xs={9}>
        <Slider value={speed} onChange={handleSpeedChange} min={0} max={12} step={0.5} />
      </Grid>
      <Grid style={{ margin: "0 auto" }} item xs={8}>
        <Typography variant="h4" align="center">{speed}</Typography>
      </Grid>

      <Grid item xs={8} style={{ margin: "0 auto" }}>
          <Button variant="contained" color="primary" onClick={handleStart}>Start Run</Button>
          <Button></Button>
          <Button variant="contained" color="secondary" onClick={handleStop}>Stop</Button>
      </Grid>
    </Grid>
  );
}

export default App;
