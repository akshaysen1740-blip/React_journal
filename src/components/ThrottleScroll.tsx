import { useEffect, useRef, useState } from "react";
import FeatureLayout from "./FeatureLayout";

const ThrottleScroll = () => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrollCount, setScrollCount] = useState(0);
  const [throttleCount, setThrottleCount] = useState(0);
  const [lastTriggeredAt, setLastTriggeredAt] = useState<string>("Waiting...");

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const throttle = (action: () => void, time: number) => {
    if (timer.current !== null) return;

    timer.current = setTimeout(() => {
      action();
      setThrottleCount((prev) => prev + 1);
      setLastTriggeredAt(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      timer.current = null;
    }, time);
  };

  return (
    <FeatureLayout
      title="Throttle Scroll"
      description="A scroll-tracking interaction that limits expensive work to a controlled interval while preserving a responsive experience."
      badge="Utility"
    >
      <div className="throttle-container">
        <div className="throttle-header-bar">
          <div>
            <p className="throttle-eyebrow">Live Demo</p>
            <h2 className="throttle-title">Scroll Behavior Monitor</h2>
          </div>

          <div className="throttle-window-badge">
            <span className="throttle-dot" />
            1000ms Throttle Window
          </div>
        </div>

        <div className="throttle-grid">
          <div className="throttle-stream-panel">
            <div className="throttle-stream-header">
              <span>Content Stream (Scroll Inside)</span>
              <span>{scrollCount} Total Events</span>
            </div>

            <div
              className="throttle-stream-box"
              onScroll={() => {
                setScrollCount((prev) => prev + 1);
                throttle(() => {
                  // expensive work is limited to once per interval
                }, 1000);
              }}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="throttle-stream-item">
                  <span className="throttle-stream-item-title">Stream Item #{i + 1}</span>
                  <p className="throttle-stream-item-desc">
                    Scroll events fire continuously on container scroll, but throttled actions trigger at most once every 1000ms window.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="throttle-metrics-sidebar">
            <div className="throttle-metric-card">
              <p className="throttle-metric-label">Total Scroll Events</p>
              <p className="throttle-metric-value">{scrollCount}</p>
            </div>

            <div className="throttle-metric-card highlight">
              <p className="throttle-metric-label">Throttled Actions Fired</p>
              <p className="throttle-metric-value">{throttleCount}</p>
            </div>

            <div className="throttle-metric-card">
              <p className="throttle-metric-label">Last Action Fired</p>
              <p className="throttle-metric-time">{lastTriggeredAt}</p>
            </div>
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
};

export default ThrottleScroll;
