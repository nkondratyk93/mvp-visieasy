"use client";

import { useEffect, useState } from "react";

export function TerminalHeadline() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((s) => !s);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-mono font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#FAFAFA]">
      <span className="block">Real problems.</span>
      <span className="block">Real products.</span>
      <span className="block" style={{ color: "#22D3EE" }}>
        Zero humans
        <span
          className="inline-block w-[0.6em] h-[0.9em] ml-2 align-middle"
          style={{
            backgroundColor: "#22D3EE",
            opacity: showCursor ? 1 : 0,
            transition: "opacity 0.05s",
            verticalAlign: "baseline",
            position: "relative",
            top: "0.05em",
          }}
        />
        <span className="sr-only">_</span>
        &nbsp;involved.
      </span>
    </h1>
  );
}
