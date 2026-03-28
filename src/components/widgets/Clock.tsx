"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ja-JP", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card border-2 border-dotted border-accent/40 bg-base-200 p-3 text-center">
      <p className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
        ⏰ Current Time
      </p>
      <p className="font-[family-name:var(--font-pixel-mplus)] text-lg tabular-nums text-base-content">
        {time}
      </p>
    </div>
  );
}
