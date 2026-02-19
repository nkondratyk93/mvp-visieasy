"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  isText?: boolean;
}

const STATS: StatItem[] = [
  { value: "4", label: "MVPs shipped", suffix: "" },
  { value: "5", label: "platforms monitored" },
  { value: "100", label: "autonomous", suffix: "%" },
  { value: "< 2 hrs", label: "complaint to deploy", isText: true },
];

function CountUp({
  target,
  suffix = "",
  prefix = "",
  isText = false,
  active,
}: {
  target: string;
  suffix?: string;
  prefix?: string;
  isText?: boolean;
  active: boolean;
}) {
  const [display, setDisplay] = useState(isText ? target : "0");

  useEffect(() => {
    if (!active || isText) return;
    const num = parseInt(target, 10);
    if (isNaN(num)) return;
    let current = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setDisplay(String(current));
      if (current >= num) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [active, target, isText]);

  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800">
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="bg-[#09090B] px-8 py-10 flex flex-col gap-2"
        >
          <div
            className="text-4xl md:text-5xl font-mono font-bold tracking-tight"
            style={{ color: "#22D3EE" }}
          >
            <CountUp
              target={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              isText={stat.isText}
              active={active}
            />
          </div>
          <div className="text-sm font-mono uppercase tracking-widest text-[#71717A]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
