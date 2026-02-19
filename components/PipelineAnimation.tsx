"use client";

import { useEffect, useState } from "react";

const STAGES = [
  { id: "detect", label: "complaint\ndetected", icon: "⚠", color: "#EF4444" },
  { id: "score", label: "scoring", icon: "◈", color: "#F59E0B" },
  { id: "spec", label: "spec\nwriting", icon: "◻", color: "#8B5CF6" },
  { id: "build", label: "building", icon: "⚙", color: "#22D3EE" },
  { id: "deploy", label: "deployed", icon: "✓", color: "#A3E635" },
];

export function PipelineAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [dataFlowPos, setDataFlowPos] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % STAGES.length;
        if (next === 0) {
          setCompletedIndices([]);
        } else {
          setCompletedIndices((c) => [...c, prev]);
        }
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const flowInterval = setInterval(() => {
      setDataFlowPos((prev) => {
        const next = { ...prev };
        for (let i = 0; i < STAGES.length - 1; i++) {
          const key = `flow-${i}`;
          next[key] = ((prev[key] || 0) + 3) % 100;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(flowInterval);
  }, []);

  return (
    <div className="w-full select-none">
      {/* Desktop: horizontal pipeline */}
      <div className="hidden md:flex items-center justify-between gap-0 w-full">
        {STAGES.map((stage, i) => {
          const isActive = i === activeIndex;
          const isComplete = completedIndices.includes(i);
          const isPending = !isActive && !isComplete;

          return (
            <div key={stage.id} className="flex items-center flex-1">
              {/* Node */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div
                  className="relative w-14 h-14 rounded border flex items-center justify-center text-xl transition-all duration-500"
                  style={{
                    borderColor: isActive
                      ? stage.color
                      : isComplete
                      ? stage.color + "88"
                      : "#3F3F46",
                    backgroundColor: isActive
                      ? stage.color + "20"
                      : isComplete
                      ? stage.color + "10"
                      : "#18181B",
                    boxShadow: isActive
                      ? `0 0 20px ${stage.color}44, 0 0 40px ${stage.color}22`
                      : "none",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <span
                    style={{
                      color: isActive
                        ? stage.color
                        : isComplete
                        ? stage.color + "CC"
                        : "#52525B",
                    }}
                  >
                    {stage.icon}
                  </span>
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded animate-ping opacity-30"
                      style={{ backgroundColor: stage.color }}
                    />
                  )}
                </div>
                <div className="text-center">
                  {stage.label.split("\n").map((line, li) => (
                    <div
                      key={li}
                      className="text-[10px] font-mono uppercase tracking-widest leading-tight"
                      style={{
                        color: isActive
                          ? stage.color
                          : isComplete
                          ? "#71717A"
                          : "#3F3F46",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connector line */}
              {i < STAGES.length - 1 && (
                <div className="flex-1 relative mx-1 h-[2px] overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, #3F3F46 0, #3F3F46 6px, transparent 6px, transparent 12px)`,
                    }}
                  />
                  {/* Animated data packet */}
                  {(isComplete || i < activeIndex) && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-none"
                      style={{
                        left: `${dataFlowPos[`flow-${i}`] || 0}%`,
                        backgroundColor: STAGES[i].color,
                        boxShadow: `0 0 8px ${STAGES[i].color}`,
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical pipeline */}
      <div className="flex md:hidden flex-col items-center gap-0 w-full max-w-xs mx-auto">
        {STAGES.map((stage, i) => {
          const isActive = i === activeIndex;
          const isComplete = completedIndices.includes(i);

          return (
            <div key={stage.id} className="flex flex-col items-center w-full">
              <div className="flex items-center gap-4 w-full">
                {/* Node */}
                <div
                  className="relative w-12 h-12 rounded border flex items-center justify-center text-lg flex-shrink-0 transition-all duration-500"
                  style={{
                    borderColor: isActive
                      ? stage.color
                      : isComplete
                      ? stage.color + "88"
                      : "#3F3F46",
                    backgroundColor: isActive
                      ? stage.color + "20"
                      : isComplete
                      ? stage.color + "10"
                      : "#18181B",
                    boxShadow: isActive
                      ? `0 0 16px ${stage.color}44`
                      : "none",
                  }}
                >
                  <span
                    style={{
                      color: isActive
                        ? stage.color
                        : isComplete
                        ? stage.color + "CC"
                        : "#52525B",
                    }}
                  >
                    {stage.icon}
                  </span>
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded animate-ping opacity-30"
                      style={{ backgroundColor: stage.color }}
                    />
                  )}
                </div>
                <div>
                  {stage.label.split("\n").map((line, li) => (
                    <div
                      key={li}
                      className="text-xs font-mono uppercase tracking-widest"
                      style={{
                        color: isActive
                          ? stage.color
                          : isComplete
                          ? "#71717A"
                          : "#3F3F46",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
              {i < STAGES.length - 1 && (
                <div className="w-[2px] h-8 ml-0 relative overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `repeating-linear-gradient(180deg, #3F3F46 0, #3F3F46 6px, transparent 6px, transparent 12px)`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#71717A]">
        <span
          className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse"
          style={{ boxShadow: "0 0 6px #A3E635" }}
        />
        <span>PIPELINE ACTIVE</span>
        <span className="ml-auto text-[#3F3F46]">
          stage {activeIndex + 1}/{STAGES.length}
        </span>
      </div>
    </div>
  );
}
