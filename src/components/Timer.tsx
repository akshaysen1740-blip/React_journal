import { useState } from "react";
import FeatureLayout from "./FeatureLayout";
import "../styles/Timer.css";

export const Timer = () => {
  const [count, setCount] = useState<any>(null);

  const startCounter = () => {
    const interval = setInterval(() => {
      setCount((prev : number) => {
        if(prev == 0) {
          clearInterval(interval)
          return 0;
        }
        console.log(prev)
        return prev - 1;
      })
    }, 1000)
  };

  return (
    <FeatureLayout
      title="Timer"
      description="Set a countdown and watch the value decrement in real time with a clean, focused interface."
      badge="Countdown"
    >
      <div className="timer-page">
        <div className="timer-card">
          <div className="timer-header">
            <span className="timer-badge">Countdown</span>
            <h1>Timer</h1>
          </div>

          <label className="timer-label" htmlFor="timer-input">Set duration</label>
          <div className="timer-controls">
            <input
              id="timer-input"
              type="number"
              min="0"
              placeholder="Enter seconds"
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <button onClick={startCounter}>Start Counter</button>
          </div>

          <div className="timer-display-wrap">
            <span className="timer-display-label">Current value</span>
            <div className="timer-display">{count ?? 0}</div>
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
};
