"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const target = 1042;

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const digits = count.toString().padStart(6, "0");

  return (
    <div className="flex items-center justify-center gap-0.5">
      {digits.split("").map((digit, i) => (
        <span
          key={i}
          className="inline-block w-4 rounded-sm bg-base-300 py-0.5 text-center font-pixel text-xs text-base-content"
        >
          {digit}
        </span>
      ))}
    </div>
  );
}
