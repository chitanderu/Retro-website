"use client";

import { useEffect, useState } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function VisitorCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    if (visited) {
      fetch(`${base}/api/counter`)
        .then((res) => res.json())
        .then((data) => setTarget(data.count))
        .catch(() => {});
    } else {
      fetch(`${base}/api/counter`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setTarget(data.count);
          sessionStorage.setItem("visited", "1");
        })
        .catch(() => {});
    }
  }, []);

  // Rolling number animation
  useEffect(() => {
    if (target === 0) return;
    const step = Math.max(1, Math.ceil(target / 30));
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [target]);

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
