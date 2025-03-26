import React, { useState, useEffect } from 'react';
import '../App.css';

// SVG for drone icon
const DroneIcon = () => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 5 L80 15 L100 5 L110 10 L80 25 L60 20 L40 25 L10 10 L20 5 L40 15 Z" fill="white" />
    <path d="M55 25 L65 25 L65 30 L55 30 Z" fill="white" />
  </svg>
);

// SVG for up arrow
const UpArrow = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 5 L45 40 L25 30 L5 40 Z" fill="#ffff00" />
  </svg>
);

// SVG for down arrow
const DownArrow = () => (
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 40 L45 5 L25 15 L5 5 Z" fill="#ffff00" />
  </svg>
);

// SVG for company logo
const CompanyLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 L30 10 L30 30 L10 30 Z" fill="white" stroke="white" strokeWidth="2" />
    <path d="M15 15 L25 25" stroke="black" strokeWidth="2" />
    <path d="M15 25 L25 15" stroke="black" strokeWidth="2" />
  </svg>
);

// SVG for Orion logo
const OrionLogo = () => (
  <svg width="60" height="15" viewBox="0 0 60 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 7.5 A 5 5 0 1 0 5 7.5" fill="none" stroke="#ffff00" strokeWidth="2" />
    <path d="M15 2.5 L15 12.5" stroke="#ffff00" strokeWidth="2" />
    <path d="M20 2.5 L25 12.5" stroke="#ffff00" strokeWidth="2" />
    <path d="M30 2.5 L30 12.5" stroke="#ffff00" strokeWidth="2" />
    <path d="M35 7.5 A 5 5 0 1 0 35 7.5" fill="none" stroke="#ffff00" strokeWidth="2" />
    <path d="M45 2.5 L55 2.5 L50 12.5 L45 2.5" fill="none" stroke="#ffff00" strokeWidth="2" />
  </svg>
);

const GameDashboard: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(46.1); // Set to match the image
  const [hits, setHits] = useState<number>(1); // Set to match the image
  const [misses, setMisses] = useState<number>(2); // Set to match the image
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
    return `${minutes}:${seconds}.${decimals}`;
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

  const hitPercentage = calculateHitPercentage();

  return (
    <div className="game-dashboard">
      <div className="dashboard-header">
        <div className="logo">SKY STRIKE</div>
        <div className="drone-icon">
          <DroneIcon />
        </div>
      </div>

      <div className="arrow-icons">
        <UpArrow />
        <DownArrow />
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
        <div className="hit-percentage-container">
          <div 
            className="pie-chart" 
            style={{ "--percentage": `${hitPercentage}%` } as React.CSSProperties}
          ></div>
          <div className="stat-label">HIT PERCENTAGE</div>
        </div>
      </div>

      <div className="controls">
        <button
          type="button"
          className="control-button start-button"
          onClick={handleStart}
        >
          START
        </button>
        <button
          type="button"
          className="control-button pause-button"
          onClick={handlePause}
        >
          <div className="pause-icon">
            <div className="pause-bar"></div>
            <div className="pause-bar"></div>
          </div>
        </button>
        <button
          type="button"
          className="control-button stop-button"
          onClick={handleStop}
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

      <div className="footer">
        <div className="company-logo">
          <CompanyLogo />
        </div>
        <div className="powered-by">
          <div className="powered-by-text">POWERED BY:</div>
          <OrionLogo />
        </div>
      </div>
    </div>
  );
};

export default GameDashboard;
