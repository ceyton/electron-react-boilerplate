import React, { useState, useEffect } from 'react';
import '../App.css';

const GameDashboard: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds countdown
  const [hits, setHits] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 0.1);
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, timeLeft]);

  const formatTime = (t: number): string => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60);
    const decimals = Math.floor((t % 1) * 10);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${decimals}`;
  };

  const calculateHitPercentage = (): number => {
    const total = hits + misses;
    if (total === 0) return 0;
    return Math.round((hits / total) * 100);
  };

  const handleStart = (): void => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = (): void => {
    setIsPaused(!isPaused);
  };

  const handleStop = (): void => {
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleReset = (): void => {
    setTimeLeft(60);
    setHits(0);
    setMisses(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  return (
    <div className="game-dashboard">
      <div className="dashboard-header">
        <div className="logo">
          {/* Add your Sky Strike logo here */}
          SKY STRIKE
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <div className="countdown">{formatTime(timeLeft)}</div>
          <div className="stat-label">COUNTDOWN</div>
        </div>
        <div className="stat-box">
          <div className="countdown">{hits}</div>
          <div className="stat-label">HITS</div>
        </div>
        <div className="stat-box">
          <div className="countdown">{misses}</div>
          <div className="stat-label">MISSES</div>
        </div>
        <div className="stat-box">
          <div className="countdown">{calculateHitPercentage()}%</div>
          <div className="stat-label">HIT PERCENTAGE</div>
        </div>
      </div>

      <div className="controls">
        <button
          type="button"
          className="control-button start-button"
          onClick={handleStart}
          disabled={isRunning && !isPaused}
        >
          START
        </button>
        <button
          type="button"
          className="control-button pause-button"
          onClick={handlePause}
          disabled={!isRunning}
        >
          {isPaused ? '▶' : '⏸'}
        </button>
        <button
          type="button"
          className="control-button stop-button"
          onClick={handleStop}
          disabled={!isRunning}
        >
          STOP
        </button>
        <button
          type="button"
          className="control-button reset-button"
          onClick={handleReset}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default GameDashboard;
