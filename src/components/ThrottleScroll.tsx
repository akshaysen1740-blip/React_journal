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
      <div className="w-full rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(114,47,59,0.35),_rgba(18,13,15,0.95)_58%)] p-4 shadow-[0_30px_80px_rgba(9,7,8,0.38)] backdrop-blur-sm md:p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-rose-200/80">
              Live demo
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Scroll behavior monitor
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200 md:self-auto">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            1 second throttle window
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_300px]">
          <div className="rounded-2xl border border-white/10 bg-[#120d10]/60 p-4">
            <div className="mb-4 flex items-center justify-between gap-3 px-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-slate-300">
              <span>Content stream</span>
              <span>{scrollCount} total scrolls</span>
            </div>

            <div
              className="h-[420px] overflow-y-auto rounded-xl border border-white/10 bg-[#1a1114]/80 p-4 pr-3 shadow-inner shadow-black/20"
              onScroll={() => {
                setScrollCount((prev) => prev + 1);
                throttle(() => {
                  // expensive work is limited to once per interval
                }, 1000);
              }}
            >
              <div className="space-y-3">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-200 shadow-sm shadow-black/10"
                  >
                    <span className="font-medium text-white">Content {i + 1}</span>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Scroll-driven updates are throttled to prevent excessive re-renders.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-300">
                Scroll events
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-white">{scrollCount}</p>
            </div>

            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 shadow-lg shadow-black/10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-rose-100/80">
                Throttled actions
              </p>
              <p className="mt-3 text-4xl font-bold tracking-tight text-white">{throttleCount}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 shadow-lg shadow-black/10">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-300">
                Last fired
              </p>
              <p className="mt-3 text-base font-medium text-white">{lastTriggeredAt}</p>
            </div>
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
};

export default ThrottleScroll;
