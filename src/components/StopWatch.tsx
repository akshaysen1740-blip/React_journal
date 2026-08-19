import { useEffect, useState } from "react";
import FeatureLayout from "./FeatureLayout";

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
      <div>
        <h1 className="text-[2.5rem]">
          {watch}
          {/* {hours} : {minutes} : {seconds} : {miliseconds} */}
        </h1>
        {!isRunning ? (
          <button onClick={startWatch}>Start</button>
        ) : (
          <button onClick={pauseWatch}>Pause</button>
        )}

        <button onClick={resetStopWatch}>Reset</button>
        <button onClick={markFlags}>Mark Flag</button>
      </div>
      {flags.length > 0 && (
        <div>
          <p>Flags</p>
          {flags.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      )}
    </FeatureLayout>
  );
};

export default StopWatch;
