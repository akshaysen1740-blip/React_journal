import { useState } from "react";
import FeatureLayout from "./FeatureLayout";
import "../styles/StopWatch.css";

const StopWatch = () => {
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [stopage, setStopage] = useState<number>(0);
  const [flags, setFlags] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [watch, setWatch] = useState<string>("00 : 00 : 00 : 00");

  const startWatch = () => {
    let timeStamp = Date.now();
    setIsRunning(true);
    startInteral(timeStamp);
  };

  const startInteral = (timeStamp: number) => {
    let interval = setInterval(() => {
      let totalTime = Date.now() - timeStamp + stopage;
      setTime(totalTime);
      let milis = totalTime.toString().slice(-2).padStart(2, "0");
      let second = Math.floor(totalTime / 1000)
        .toString()
        .padStart(2, "0");
      let minutes = Math.floor(totalTime / (1000 * 60))
        .toString()
        .padStart(2, "0");
      let hours = Math.floor(totalTime / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0");

      setWatch(`${hours} : ${minutes} : ${second} : ${milis}`);
    }, 0);
    setIntervalId(interval);
  };

  // to keep the record of the stopage time for any mili second
  // useEffect(() => {
  //   setStopage(time);

  //   return () => clearInterval(intervalId)
  // }, [time]);

  const pauseWatch = () => {
    clearInterval(intervalId);
    setStopage(time);
    setIsRunning(false);
  };

  const resetStopWatch = () => {
    clearInterval(intervalId);
    setTime(0);
    setFlags([]);
    setIsRunning(false);
    setWatch("00 : 00 : 00 : 00");
  };

  const markFlags = () => {
    setFlags((prev: any[]) => [...prev, watch]);
  };

  return (
    <FeatureLayout
      title="Stop watch"
      description="Stop watch and it's features"
      badge="Utility"
    >
      <div className="stopwatch-page">
        <section className="stopwatch-card" aria-label="Stopwatch controls">
          <div className="stopwatch-card-header">
            <div>
              <span className="stopwatch-kicker">Precision utility</span>
              <h2>Track every second</h2>
            </div>
            <span className={`stopwatch-status ${isRunning ? "is-running" : ""}`}>
              <span className="stopwatch-status-dot" />
              {isRunning ? "Running" : "Paused"}
            </span>
          </div>

          <div className="stopwatch-display-wrap">
            <span className="stopwatch-display-label">Elapsed time</span>
            <h1 className="stopwatch-display">
          {watch}
            </h1>
            <div className="stopwatch-units" aria-hidden="true">
              <span>Hours</span>
              <span>Minutes</span>
              <span>Seconds</span>
              <span>Millis</span>
            </div>
          </div>

          <div className="stopwatch-actions">
            {!isRunning ? (
              <button className="stopwatch-button stopwatch-button-primary" onClick={startWatch}>
                Start watch
              </button>
            ) : (
              <button className="stopwatch-button stopwatch-button-primary" onClick={pauseWatch}>
                Pause watch
              </button>
            )}
            <button className="stopwatch-button" onClick={markFlags}>Mark flag</button>
            <button className="stopwatch-button stopwatch-button-quiet" onClick={resetStopWatch}>Reset</button>
          </div>
        </section>

      {flags.length > 0 && (
        <section className="stopwatch-flags" aria-label="Marked times">
          <div className="stopwatch-flags-header">
            <div>
              <span className="stopwatch-kicker">Session notes</span>
              <h2>Marked times</h2>
            </div>
            <span className="stopwatch-flag-count">{flags.length} {flags.length === 1 ? "mark" : "marks"}</span>
          </div>
          <div className="stopwatch-flag-list">
          {flags.map((item, index) => (
            <div className="stopwatch-flag" key={`${item}-${index}`}>
              <span>Mark {String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
          </div>
        </section>
      )}
      </div>
    </FeatureLayout>
  );
};

export default StopWatch;
